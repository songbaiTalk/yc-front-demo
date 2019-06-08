/**
 * @file page1
 * @author zhangluyao01
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {message} from 'antd';


import {WrapperLogin} from '../../../components/Login';
import API from '../../../API/API';
import './index.css';

class AdministratorLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            vcode: ''
        };
    }
    componentWillMount() {
        document.title = '管理员登录';
        // 获取验证码
        axios.get(API.adminVcode)
            .then(res => {
                if (res.data.code === 0) {
                    this.setState({
                        vcode: 'data:image/png;base64,' + res.data.data
                    });
                } else {
                    message.error(res.data.message);
                }
            }).catch(err => {
                message.error('请求验证码失败，服务器无响应');
            });
    }

    render() {
        return (
            <div className="center-login">
                <div className="login-title">账户登录</div>
                <WrapperLogin
                    handleSubmit={this.handleSubmit.bind(this)}
                    vcode={this.state.vcode}
                />
            </div>
        );
    }

    handleSubmit(values) {
        axios.post(API.adminLogin, values)
            .then(res => {
                if (res.data.code === 0) {
                    this.props.history.replace('/page/admin/audit');
                    window.adminInfo = {
                        userToken: res.data.data.userToken
                    };
                } else {
                    message.error(res.data.message);
                }
            }).catch(err => {
                message.error('登录失败，服务器无响应');
            });
    }
}

// 高阶组件，将history传递给page
export default withRouter(AdministratorLogin);
