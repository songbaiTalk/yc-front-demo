/**
 * @file 审核管理页面
 * @author zhangluyao01
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Table, message} from 'antd';
import axios from 'axios';

import {TopBanner} from '../../../components/TopBanner';
import {LeftMenu} from '../../../components/LeftMenu';
import AuditModal from './editModal';
import RoleModal from './roleModal';
import TipModal from './tipModal';
import './index.css';
import API from '../../../API/API';
import SearchBox from './searchBox';

const ROLE = {
    '0': '管理员',
    '1': '审核人员'
};

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

class AuditMannagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editModalVisible: false,
            content: null,
            roleModalVisible: false,
            tipModalVisible: false,
            deleteUser: false,
            tableData: null
        };
        this.columns = [
            {
                dataIndex: 'userId',
                title: '用户id'
            },
            {
                dataIndex: 'userName',
                title: '用户名称'
            },
            {
                dataIndex: 'userStatus',
                title: '所属角色',
                render: text => (ROLE[text] || '无')
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
                                    this.handleEditUser(item);
                                }}
                            >编辑</a>
                            <a
                                href="javascript:;"
                                style={{marginRight: 10}}
                                onClick={() => {
                                    this.handleAddRole(item);
                                }}
                            >分配角色</a>
                            <a
                                href="javascript:;"
                                style={{marginRight: 10}}
                                onClick={() => {
                                    this.handleBlockUser(item);
                                }}
                            >禁用</a>
                            <a
                                href="javascript:;"
                                style={{marginRight: 10}}
                                onClick={() => {
                                    this.handleDeleteUser(item);
                                }}
                            >删除</a>
                        </div>
                    );
                }
            }
        ];
    }
    componentWillMount() {
        document.title = '用户管理';
        // 网络请求
        axios.get(API.adminUserList, {
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
        }).catch(error => {
            message.error('请求用户列表失败，服务器无响应');
        });
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <TopBanner userName={'demoUser'} handleLogout={() => {
                    this.handleLogout();
                }}/>
                <div style={{marginTop: 20, height: 'calc(100% - 85px)'}}>
                    <LeftMenu
                        handleClick={e => {
                            this.props.history.push(e.key);
                        }}
                        options= {menuOptions}
                        defaultSelectedKeys={['/page/admin/user']}
                    />
                    <div style={{float: 'right', width: 'calc(100% - 256px)', padding: 20}}>
                        <div style={{marginBottom: 20}}>
                            <Button type="primary" onClick={() => {
                                this.handleAddUser();
                            }}>添加用户</Button>
                        </div>
                        <SearchBox handleSearch={value => {
                            this.handleSearch(value);
                        }}/>
                        <div className="self-table-container">
                            <Table dataSource={this.state.tableData} columns={this.columns} bordered/>
                        </div>
                    </div>
                </div>
                <AuditModal
                    visible={this.state.editModalVisible}
                    content={this.state.content}
                    handleOk1={e => {
                        this.handleEditModalOk1(e);
                    }}
                    handleOk2={(...args) => {
                        this.handleEditModalOk2(...args);
                    }}
                    handleCancel={e => {
                        this.handleEditModalClose(e);
                    }}
                />
                <RoleModal
                    visible={this.state.roleModalVisible}
                    content={this.state.content}
                    handleOk={e => {
                        this.handleRoleModalOk(e);
                    }}
                    handleCancel={e => {
                        this.handleRoleModalClose(e);
                    }}
                />
                <TipModal
                    visible={this.state.tipModalVisible}
                    content={this.state.content}
                    deleteUser={this.state.deleteUser}
                    handleOk1={e => {
                        this.handleTipModalOk1(e);
                    }}
                    handleOk2={e => {
                        this.handleTipModalOk2(e);
                    }}
                    handleCancel={e => {
                        this.handleTipModalClose(e);
                    }}
                />
            </div>
        );
    }

    // 添加用户的按钮
    handleAddUser() {
        this.setState({
            editModalVisible: true,
            content: null
        });
    }

    // 编辑用户按钮
    handleEditUser(content) {
        this.setState({
            editModalVisible: true,
            content: content
        });
    }

    // 分配角色的按钮
    handleAddRole(content) {
        this.setState({
            roleModalVisible: true,
            content
        });
    }

    handleBlockUser(content) {
        this.setState({
            tipModalVisible: true,
            deleteUser: false,
            content
        });
    }

    handleDeleteUser(content) {
        this.setState({
            tipModalVisible: true,
            deleteUser: true,
            content
        });
    }

    handleEditModalClose() {
        this.setState({
            editModalVisible: false
        });
    }
    // 此逻辑为添加用户的逻辑
    handleEditModalOk1(user) {
        this.handleEditModalClose();
        // 网络请求
        axios.get(API.adminUserAdd, {
            headers: {
                'x-user-token': window.adminInfo && window.adminInfo.userToken
            },
            params: {
                ...user
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
        }).catch(error => {
            message.error('添加用户失败，服务器无响应');
        });
    }

    // 此逻辑为编辑用户的逻辑
    handleEditModalOk2(user, userId) {
        this.handleEditModalClose();
        // 网络请求
        axios.get(API.adminUserEdit, {
            headers: {
                'x-user-token': window.adminInfo && window.adminInfo.userToken
            },
            params: {
                ...user,
                userId
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
        }).catch(error => {
            message.error('编辑用户失败，服务器无响应');
        });
    }

    handleRoleModalClose() {
        this.setState({
            roleModalVisible: false
        });
    }

    handleRoleModalOk(data) {
        this.handleRoleModalClose();
        // 网络请求
        axios.get(API.adminUserEditRole, {
            params: data,
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
        }).catch(error => {
            message.error('分配角色失败，服务器无响应');
        });
    }

    handleTipModalClose() {
        this.setState({
            tipModalVisible: false
        });
    }

    // 禁用用户的处理逻辑
    handleTipModalOk1(userId) {
        this.handleTipModalClose();
        // 网络请求
        axios.post(API.adminUserDisable, {userId}, {
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
        }).catch(error => {
            message.error('禁用角色失败，服务器无响应');
        });
    }

    // 删除用户的处理逻辑
    handleTipModalOk2(userId) {
        this.handleTipModalClose();
        // 网络请求
        axios.post(API.adminUserDel, {userId}, {
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
        }).catch(error => {
            message.error('删除角色失败，服务器无响应');
        });
    }

    // 搜索
    handleSearch(value) {
        // 网络请求
        axios.get(API.adminUserList, {
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
        }).catch(error => {
            message.error('搜索用户失败，服务器无响应');
        });
    }

    handleLogout() {
        // 应该先往后端发一个请求
        // 跳转到登录页面
        this.props.history.push('/page/admin/login');
    }
}

export default withRouter(AuditMannagement);
