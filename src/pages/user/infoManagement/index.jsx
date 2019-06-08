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

class InfoMannagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            edit: false,
            tableData: null,
            modalContent: null
        };
        this.columns = [
            {
                dataIndex: 'userName',
                title: '资料名称'
            },
            {
                dataIndex: 'avatar',
                title: '文件类型',
                render: src => <img height="30px" src={src} />
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
                dataIndex: 'operation',
                title: '操作',
                render: (text, item) => {
                    return (
                        <div>
                            <a
                                href="javascript:;"
                                style={{marginRight: 10}}
                                onClick={() => {
                                    this.handleShow(false);
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
        // 网络请求
        this.getMaterialList();
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
                        defaultSelectedKeys={['/page/user/info']}
                    />
                    <div style={{float: 'right', width: 'calc(100% - 256px)', padding: 20}}>
                        <div style={{marginBottom: 20}}>
                            <Button type="primary" onClick={() => {
                                this.handleUploadButton();
                            }}>上传资料</Button>
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
                    audit={this.state.audit}
                    handleOk={e => {
                        this.state.edit ? this.handleUpdate() : this.handleUpload(e);
                    }}
                    handleCancel={e => {
                        this.handleClose(e);
                    }}
                />
            </div>
        );
    }

    // 得到资料列表
    getMaterialList() {
        axios.get(API.xzMaterialList)
            .then(res => {
                if (res.data.code === 0) {
                    this.setState({
                        tableData: res.data.data
                    });
                } else {
                    message.error(res.data.message);
                }
            }).catch(err => {
                message.error('获取资料列表失败，服务器无响应');
            });
    }

    handleClose() {
        this.setState({
            modalVisible: false
        });
    }

    handleUpload(formData) {
        // 上传资料
        axios.post(API.xzMaterialUpload, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(res => {
                if (res.data.code === 0) {
                    message.success(res.data.message);
                    this.handleClose();
                } else {
                    message.error(res.data.message);
                }
            }).catch(err => {
                message.error('上传失败，服务器无响应');
            });
    }

    handleLogout() {
        // 应该先往后端发一个请求
        // 跳转到登录页面
        this.props.history.replace('/page/user/login');
    }

    // 上传资料
    handleUploadButton() {
        this.setState({
            modalVisible: true
        });
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
            message.error('获取资料列表失败，服务器无响应');
        });
    }
}

export default withRouter(InfoMannagement);
