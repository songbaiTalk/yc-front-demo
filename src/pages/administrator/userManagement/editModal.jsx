/**
 * @file 编辑/添加用户弹窗
 * @author zhangluyao01
 */
import React from 'react';
import {Modal, Input, Form} from 'antd';

const Item = Form.Item;

class AuditModal extends React.Component {
    handleOk() {
        const form = this.props.form;
        form.validateFields().then(() => {
            const content = this.props.content;
            const user = form.getFieldsValue();
            if (content && content.userId) {
                this.props.handleOk2(user, content.userId);
            } else {
                this.props.handleOk1(user);
            }
        });
    }
    render() {
        let title = '编辑/添加用户';
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal
            title={title}
            visible={this.props.visible}
            onOk={e => {
                this.handleOk(e);
            }}
            onCancel={this.props.handleCancel}
            okText="确定"
            cancelText="取消"
            >
                <Form>
                    <Item>
                        <span className="self-text" style={{width: 60}}>名称:</span>
                        {
                            getFieldDecorator('userName', {
                                rules: [{required: true, message: '请输入用户名称'}],
                                initialValue: this.props.content && this.props.content.userName
                            })(<Input
                                placeholder="请输入用户名称"
                                style={{width: 'calc(100% - 60px)'}}
                            />)
                        }
                    </Item>
                    <Item>
                        <span className="self-text" style={{width: 60}}>密码:</span>
                        {
                            getFieldDecorator('userPassword', {
                                initialValue: this.props.content && this.props.content.userPassword
                            })(<Input
                                placeholder="可不填，默认密码123456"
                                style={{width: 'calc(100% - 60px)'}}
                            />)
                        }
                    </Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({name: 'addUser'})(AuditModal);
