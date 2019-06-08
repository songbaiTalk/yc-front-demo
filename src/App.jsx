/**
 * @file 应用的入口
 * @author zhangluyao01
 */
import React from 'react';
import moment from 'moment';
import {DatePicker, Select, Form, Row, Col, Button} from 'antd';

import Table from './components/Table';
import getInfoTable from './services/getInfoTable';

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

        // 每隔15分钟刷新一下数据
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
        const timeArr = [];
        const month = date.format('M');
        const day = date.format('d');
        if (role.includes('合伙人')) {
            data[role].forEach((item, index) => {
                if (item !== dataSource[index][role].isFree) {
                    timeArr.push([month, day, dataSource[index].time]);
                }
            });
            console.log({
                name: role,
                timeArr
            });
        } else {

        }
    }
}

function getDateTime(data, previousDate) {

}

function validateData(data) {
    Object.keys(data).forEach()
}

export default Form.create()(APP);
