/**
 * @file 资料管理页面
 * @author zhangluyao01
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Table, message} from 'antd';
import axios from 'axios';

import {TopBanner} from '../../../components/TopBanner';
import {LeftMenu} from '../../../components/LeftMenu';
import AuditModal from './modal';
import './index.css';
import API from '../../../API/API';
import SearchBox from './searchBox';

const menuOptions = [
    {
        key: '/page/admin/audit',
        title: '审核管理',
        children: [{
            key: '/page/admin/info',
            title: '资料管理'
        }]
    },
    {
        key: '/page/admin/user',
        title: '用户管理'
    }
];

const dataSource = [
    {
        "approveStatus": 0,
        "avatar": "string",
        "enabled": 1,
        "graduateMajor": "string",
        "graduateSchool": "string",
        "graduateScore": "string",
        "userId": 0,
        "userName": "string"
    }
];

const content = {
    "approveStatus": 0,
    "avatar": "string",
    "enabled": 0,
    "graduateMajor": "string",
    "graduateSchool": "string",
    "graduateScore": "string",
    "userId": 0,
    "userName": "string",
    profileList: ['1', '2']
}

class AuditMannagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            audit: false,
            tableData: null,
            userDetail: null
        };
        this.columns = [
            {
                dataIndex: 'userName',
                title: '资料名称'
            },
            {
                dataIndex: 'avatar',
                title: '文件类型'
            },
            {
                dataIndex: 'graduateScore',
                title: '上传时间'
            },
            {
                dataIndex: 'graduateSchool',
                title: '价钱'
            },
            {
                dataIndex: 'graduateMajor',
                title: '购买量'
            },
            {
                dataIndex: 'enabled',
                title: '上架状态'
            },
            {
                dataIndex: 'approveStatus',
                title: '审核状态'
            },
            {
                dataIndex: 'operation',
                title: '操作',
                render: (text, item) => {
                    return (
                        <div>
                            <a
                                href="javascript:;"
                                style={{marginRight: 10}}
                                onClick={() => {
                                    this.handleGetDetail(false, item.userId);
                                }}
                            >查看</a>
                            {this.getSatusBtn(item)}
                        </div>
                    );
                }
            }
        ];
    }

    componentWillMount() {
        document.title = '资料管理';
        // 请求资料用户列表
        axios.get(API.adminMaterialList, {
            headers: {
                'x-user-token': window.adminInfo && window.adminInfo.userToken
            }
        }).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    tableData: res.data.data
                });
            } else {
                message.error(res.data.message);
            }
        }).catch(err => {
            message.error('获取列表失败，服务器无响应');
        });
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <TopBanner userName={'demoUser'} handleLogout={() => {
                    this.handleLogout();
                }}/>
                <div style={{marginTop: 20, height: 'calc(100% - 85px)'}}>
                    <LeftMenu handleClick={e => {
                        this.props.history.push(e.key);
                    }} options= {menuOptions} defaultActiveKey="/page/admin/info"/>
                    <div style={{float: 'right', width: 'calc(100% - 256px)', padding: 20}}>
                        <SearchBox handleSearch={this.handleSearch.bind(this)}/>
                        <div className="self-table-container">
                            <Table dataSource={dataSource} columns={this.columns} bordered/>
                        </div>
                    </div>
                </div>
                <AuditModal
                    visible={this.state.modalVisible}
                    audit={this.state.audit}
                    content={this.state.userDetail}
                    handleOk={e => {
                        this.handleOk(e);
                    }}
                    handleCancel={e => {
                        this.handleClose(e);
                    }}
                    handleReject={e => {
                        this.handleReject(e);
                    }}
                />
            </div>
        );
    }

    getSatusBtn(item) {
        if (item.approveStatus === 0 || item.approveStatus === 3) {
            return (
                <a
                    href="javascript:;"
                    onClick={() => {
                        this.handleGetDetail(true, item.userId);
                    }}
                >审核</a>
            );
        } else if (item.enabled) {
            return (<a
                href="javascript:;"
                onClick={
                    () => {
                        this.handlePullOff(item.userId);
                    }
                }
                >
                下架</a>
            );
        }
        return (<a
            href="javascript:;"
            onClick={
                () => {
                    this.handlePutOn(item.userId);
                }
            }
            >
            上架</a>
        );
    }

    // 查看
    handleGetDetail(audit, userId) {
        // 发起网络请求
        axios.get(API.adminMaterialDetail, {
            params: {
                userId
            },
            headers: {
                'x-user-token': window.adminInfo && window.adminInfo.userToken
            }
        }).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    userDetail: {...res.data.data, userId}
                });
            } else {
                message.error(res.data.message);
            }
        }).catch(err => {
            message.error('获取用户明细失败，服务器无响应');
        });
        // 显示modal
        this.setState({modalVisible: true, audit});
    }

    handleClose() {
        this.setState({
            modalVisible: false
        });
    }

    // 审核通过
    handleOk(userId) {
        axios.post(API.adminMaterialSuccess, {
            userId
        }, {
            headers: {
                'x-user-token': window.adminInfo && window.adminInfo.userToken
            }
        }).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    tableData: res.data.data
                });
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        }).catch(err => {
            message.error('审核失败，服务器无响应');
        });
        this.handleClose();
    }

    // 驳回请求
    handleReject(userId) {
        axios.post(API.adminMaterialReject, {
            userId
        }, {
            headers: {
                'x-user-token': window.adminInfo && window.adminInfo.userToken
            }
        }).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    tableData: res.data.data
                });
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        }).catch(err => {
            message.error('审核失败，服务器无响应');
        });
    }

    handleLogout() {
        // 应该先往后端发一个请求
        // 跳转到登录页面
        this.props.history.push('/page/admin/login');
    }

    // 处理搜索
    handleSearch(value) {
        // 请求数据
        axios.get(API.adminMaterialList, {
            params: value,
            headers: {
                'x-user-token': window.adminInfo && window.adminInfo.userToken
            }
        }).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    tableData: res.data.data
                });
            } else {
                message.error(res.data.message);
            }
        }).catch(err => {
            message.error('获取列表失败，服务器无响应');
        });
    }

    // 上架
    handlePutOn(userId) {
        axios.post(API.adminMaterialPutOn, {
            userId
        }, {
            headers: {
                'x-user-token': window.adminInfo && window.adminInfo.userToken
            }
        }).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    tableData: res.data.data
                });
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        }).catch(err => {
            message.error('上架失败，服务器无响应');
        });
    }

    // 下架
    handlePullOff(userId) {
        axios.post(API.adminMaterialPullOff, {
            userId
        }, {
            headers: {
                'x-user-token': window.adminInfo && window.adminInfo.userToken
            }
        }).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    tableData: res.data.data
                });
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        }).catch(err => {
            message.error('下架失败，服务器无响应');
        });
    }
}

export default withRouter(AuditMannagement);
