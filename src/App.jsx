/**
 * @file 应用的入口
 * @author zhangluyao01
 */
import React from 'react';
import moment from 'moment';
import {DatePicker, Select, Form, Row, Col, Button, notification} from 'antd';

import Table from './components/Table';
import getInfoTable from './services/getInfoTable';
import addPartner from './services/addPartner';
import makeMeeting from './services/makeMeeting';
import cancelMeeting from './services/cancelMeeting';

const {Option} = Select;
const {Item} = Form;
const roles = [];
const columns = [{
    dataIndex: 'time',
    title: '时间'
}];
for (let i = 1; i < 6; i++) {
    columns.push({
        dataIndex: '合伙人' + i,
        title: '合伙人' + i
    });
    roles.push('合伙人' + i);
}
for (let i = 1; i < 3; i++) {
    roles.push('创业者' + i);
}

let dataSource = [];
for (let i = 0; i < 12; i++) {
    let obj = {
        time: moment('09:00', 'hh:mm').add(15 * i, 'minute').format('hh:mm')
    };
    for (let i = 1; i < 6; i++) {
        obj['合伙人' + i] = {
            isFree: true,
            entrepreneur: '',
            name: '合伙人' + i
        };
    }
    dataSource.push(obj);
}



class APP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: null
        };
    }
    componentWillMount() {
        // 请求数据
        getInfoTable({time: ['6', '8']}).then(result => {
            this.setState({
                tableData: result.data
            });
        });

        // 每隔30s刷新一下数据
        setInterval(() => {
            const date = this.props.form.getFieldValue('date');
            getInfoTable({time: [date.format('M'), date.format('D')]}).then(result => {
                this.setState({
                    tableData: result.data
                });
            });
        }, 30000);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="App">
                <Row>
                    <Col span={4}>
                        <Item>
                            {
                                getFieldDecorator('date', {
                                    initialValue: moment()
                                })(<DatePicker onChange={date => {this.handleDatePickerChange(date); }}/>)
                            }
                        </Item>
                    </Col>
                    <Col span={4}>
                        <Item>
                            {
                                getFieldDecorator('role', {
                                    initialValue: '合伙人1'
                                })(
                                    <Select style={{width: 200}}>
                                        {
                                            roles.map(item => (
                                                <Option value={item} key={item}>
                                                    {item}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </Item>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" onClick={() => {this.handleClick(); }}>
                            确认
                        </Button>
                    </Col>
                </Row>
                {
                    this.state.tableData
                    ? <Table
                        columns={this.state.tableData.columns}
                        dataSource={this.state.tableData.dataSource}
                        form={this.props.form}
                        handleCancel={(row, text) => {
                            this.handleCancel(row, text);
                        }}
                    />
                    : null
                }
            </div>
        );
    }

    handleDatePickerChange(date) {
        getInfoTable({time: [date.format('M'), date.format('D')]}).then(result => {
            this.setState({
                tableData: result.data
            });
        });
    }

    handleClick() {
        const {getFieldsValue} = this.props.form;
        const {role, date, data} = getFieldsValue();
        const {dataSource} = this.state.tableData;
        const timeArr = [];
        const month = date.format('M');
        const day = date.format('D');
        if (role.includes('合伙人')) {
            data[role].forEach((item, index) => {
                if (item.other !== dataSource[index][role].isFree) {
                    timeArr.push([month, day, dataSource[index].time]);
                }
            });
            let pushData = {
                name: role,
                timeArr
            };
            addPartner(pushData).then(() => {
                getInfoTable({time: [month, day]}).then(result => {
                    this.setState({
                        tableData: result.data
                    });
                });
            });
        } else {
            let pushData2 = {
                player: role,
                month,
                day,
                meetingList: getDateTime(data, dataSource, role)
            };

            makeMeeting(pushData2).then(() => {
                getInfoTable({time: [month, day]}).then(result => {
                    this.setState({
                        tableData: result.data
                    });
                });
            });
        }
    }

    handleCancel(row, text) {
        const {getFieldsValue} = this.props.form;
        const player = getFieldsValue().role;
        const date = getFieldsValue().date;
        const month = date.format('M');
        const day = date.format('D');
        const pushData = {
            partner: text.name,
            player,
            time: {
                month,
                day,
                time: row.time
            }
        };
        cancelMeeting(pushData).then(() => {
            getInfoTable({time: [month, day]}).then(result => {
                this.setState({
                    tableData: result.data
                });
            });
        });
    }
}

function getDateTime(data, previousData, player) {
    if (!validateData(data)) {
        return;
    }
    console.log(previousData);
    const timeArr = [];
    Object.keys(data).forEach(partner => {
        data[partner].forEach((item, index) => {
            if (item.entrepreneur && !previousData[index][partner].entrepreneur) {
                timeArr.push({partner, player, time: previousData[index].time});
            }
        });
    });
    return timeArr;
}

function validateData(data) {
    return Object.keys(data).every(partner => {
        let temp = [];
        data[partner].forEach((item, index) => {
            if (item.entrepreneur) {
                temp.push(index);
            }
        });
        console.log(temp);
        if (temp.length > 0 && temp[temp.length] - temp[0] >= temp.length) {
            notification.error({
                message: '错误',
                description: '您一天内不能分两段时间和合伙人见面'
            });
            return false;
        }
        if (temp.length > 4) {
            notification.error({
                message: '错误',
                description: '您预约的时间不能超过一小时!'
            });
            return false;
        }
        return true;
    });
}

export default Form.create()(APP);
