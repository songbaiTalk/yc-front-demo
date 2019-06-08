/**
 * @file 公用的login组件
 * @author zhangluyao01
 */

import React from 'react';
import {
    Form,
    Input,
    Button
} from 'antd';

import './index.css';

class Login extends React.Component {
    render() {
        const handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err && this.props.handleSubmit) {
                    this.props.handleSubmit(values);
                }
            });
        };

        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    <span className="login-form-span">账号:</span>
                    {getFieldDecorator('account', {
                        rules: [{required: true, message: '请输入账号!'}]
                    })(
                        <Input placeholder="账号" />
                    )}
                </Form.Item>
                <Form.Item>
                    <span className="login-form-span">密码:</span>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '密码不能为空!'}]
                    })(
                        <Input
                            type="password"
                            placeholder="密码"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <span className="login-form-span">验证码:</span>
                    {getFieldDecorator('vcode', {
                        rules: [{required: true, message: '验证码不能为空!'}]
                    })(
                        <Input placeholder="验证码" />
                    )}
                </Form.Item>
                <Form.Item>
                    <div style={{marginLeft: 65}}>
                        <img src={this.props.vcode} />
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export const WrapperLogin = Form.create({name: 'normal_login'})(Login);
