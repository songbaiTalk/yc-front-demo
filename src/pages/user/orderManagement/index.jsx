/**
 * @file 审核管理页面
 * @author zhangluyao01
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Table, message} from 'antd';
import axios from 'axios';

import {TopBanner} from '../../../components/TopBanner';
import {LeftMenu} from '../../../components/LeftMenu';
import AuditModal from './modal';
import SearchBox from './searchBox';
import API from '../../../API/API';
import './index.css';

const menuOptions = [
    {
        key: '/page/user/info',
        title: '资料管理'
    },
    {
        key: '/page/user/order',
        title: '订单管理'
    }
];

class OrderMannagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            tableData: null,
            maxAmount: null
        };
        this.columns = [
            {
                dataIndex: 'userName',
                title: '姓名'
            },
            {
                dataIndex: 'avatar',
                title: '订单号'
            },
            {
                dataIndex: 'graduateScore',
                title: '订单时间'
            },
            {
                dataIndex: 'graduateSchool',
                title: '订单详情'
            },
            {
                dataIndex: 'graduateMajor',
                title: '订单类型'
            },
            {
                dataIndex: 'enabled',
                title: '订单金额'
            },
            {
                dataIndex: 'operation',
                title: '当前账户收入'
            }
        ];
    }
    componentWillMount() {
        document.title = '订单管理';
        // 网络请求
        this.getOrderList();
        this.getMaxMoney();
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <TopBanner userName={window.userName || 'test'} handleLogout={() => {
                    this.handleLogout();
                }}/>
                <div style={{marginTop: 20, height: 'calc(100% - 85px)'}}>
                    <LeftMenu
                        handleClick={e => {
                            this.props.history.push(e.key);
                        }}
                        options= {menuOptions}
                        defaultSelectedKeys={['/page/user/order']}
                    />
                    <div style={{float: 'right', width: 'calc(100% - 256px)', padding: 20}}>
                        <div style={{marginBottom: 20}}>
                            {}&nbsp;您好，当前账户余额：1344.00
                            <a
                                href="javascript:;"
                                style={{
                                    marginLeft: 10
                                }}
                                onClick={() => {
                                    this.handleWithdraw();
                                }}
                            >
                                提现
                            </a>
                        </div>
                        <SearchBox handleSearch={data => {
                            this.handleSearch(data);
                        }} />
                        <div className="self-table-container">
                            <Table dataSource={this.state.tableData} columns={this.columns} bordered/>
                        </div>
                    </div>
                </div>
                <AuditModal
                    visible={this.state.modalVisible}
                    maxAmount={1344}
                    handleOk={e => {
                        this.handleOK(e);
                    }}
                    handleCancel={e => {
                        this.handleClose(e);
                    }}
                />
            </div>
        );
    }

    // 得到资料列表
    getOrderList() {
        axios.get(API.xzOrderList)
            .then(res => {
                if (res.data.code === 0) {
                    this.setState({
                        tableData: res.data.data
                    });
                } else {
                    message.error(res.data.message);
                }
            }).catch(err => {
                message.error('获取订单列表失败，服务器无响应');
            });
    }

    // 得到最大的可提现金额
    getMaxMoney() {
        axios.get(API.xzOrderMaxMoney)
            .then(res => {
                if (res.data.code === 0) {
                    this.setState({
                        maxAmount: res.data.data
                    });
                } else {
                    message.error(res.data.message);
                }
            }).catch(err => {
                message.error('获取最大提现金额失败，服务器无响应');
            });
    }

    handleClose() {
        this.setState({
            modalVisible: false
        });
    }

    handleWithdraw() {
        this.setState({
            modalVisible: true
        });
    }

    handleLogout() {
        // 应该先往后端发一个请求
        // 跳转到登录页面
        this.props.history.replace('/page/user/login');
    }

    // 点击搜索框后的处理
    handleSearch(data) {
        // 发送请求
        axios.get(API.xzMaterialList, {
            params: data
        }).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    tableData: res.data.data
                });
            } else {
                message.error(res.data.message);
            }
        }).catch(err => {
            message.error('服务器无响应');
        });
    }

    // modal的确定按钮
    handleOK(data) {
        // 发送提现请求
        axios.get(API.xzOrderWithdraw, {
            params: data
        }).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    maxAmount: res.data.data
                });
            } else {
                message.error(res.data.message);
            }
            this.handleClose();
        }).catch(err => {
            message.error('提现失败，服务器无响应');
        });
    }
}

export default withRouter(OrderMannagement);
