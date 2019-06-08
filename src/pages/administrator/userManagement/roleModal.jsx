/**
 * @file 分配角色弹窗
 * @author zhangluyao01
 */
import React from 'react';
import {Modal, Radio, Form} from 'antd';

const RadioGroup = Radio.Group;

class RoleModal extends React.Component {
    handleOk() {
        const data = this.props.form.getFieldsValue();
        this.props.handleOk({userId: this.props.content.userId, ...data});
    }
    render() {
        let title = '分配角色';
        return (
            <Modal
            title={title}
            visible={this.props.visible}
            onOk={() => {
                this.handleOk();
            }}
            onCancel={this.props.handleCancel}
            okText="确定"
            cancelText="取消"
            >
                <Form>
                    <Form.Item>
                    {
                        this.props.form.getFieldDecorator('userStatus', {
                            initialValue: this.props.content && this.props.content.userStatus
                        })(
                            <RadioGroup>
                                <Radio value={1}>
                                    审核人员
                                </Radio>
                                <Radio value={0}>
                                    管理员
                                </Radio>
                            </RadioGroup>
                        )
                    }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({name: 'addRole'})(RoleModal);
