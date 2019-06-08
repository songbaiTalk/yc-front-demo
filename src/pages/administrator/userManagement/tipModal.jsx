/**
 * @file 提示弹窗
 * @author zhangluyao01
 */
import React from 'react';
import {Modal} from 'antd';

export default class RoleModal extends React.Component {
    handleOk() {
        const userId = this.props.content && this.props.content.userId;
        if (this.props.deleteUser) {
            this.props.handleOk2(userId);
        } else {
            this.props.handleOk1(userId);
        }
    }
    render() {
        let title = '提示';
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
                <div>
                    {
                        this.props.deleteUser
                        ? '确定删除该用户吗?'
                        : '确定禁用该用户吗?'
                    }
                </div>
            </Modal>
        );
    }
}
