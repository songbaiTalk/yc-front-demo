/**
 * @file 提现弹窗
 * @author zhangluyao01
 */
import React from 'react';
import {Modal, Form, Input} from 'antd';

class WithdrawModal extends React.Component {
    handleOk() {
        this.props.form.validateFields();
        const value = this.props.form.getFieldsValue();
        this.props.handleOk(value);
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        let title = '提现';
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
                        {getFieldDecorator('amount', {
                            rules: [{required: true, message: '请输入提现金额!'}]
                        })(
                            <Input placeholder={`请输入您的提现金额，最多可输入${this.props.maxAmount}`} />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({name: 'material_Modal'})(WithdrawModal);
