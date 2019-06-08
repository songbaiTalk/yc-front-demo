/**
 * @file 查看审核弹窗
 * @author zhangluyao01
 */
import React from 'react';
import {Modal, Form} from 'antd';

const Item = Form.Item;
export default class AuditModal extends React.Component {
    render() {
        const content = this.props.content || {};
        let title = '查看';
        let okButtonProps = {
            type: 'primary',
            disabled: !this.props.audit
        };
        let cancelButtonProps = {
            disabled: !this.props.audit,
            onClick: () => {
                this.props.handleReject(content.userId);
                this.props.handleCancel();
            }
        };
        if (this.props.audit) {
            title = '审核';
        }
        return (
            <Modal
            title={title}
            visible={this.props.visible}
            onOk={() => {
                this.props.handleOk(content.userId);
            }}
            onCancel={this.props.handleCancel}
            okButtonProps={okButtonProps}
            okText="审核"
            cancelButtonProps={cancelButtonProps}
            cancelText="驳回"
            >
                <div style={{display: 'flex'}}>
                    <Form className="self-form">
                        <Item>
                            <span className="info-text">资料名称:</span>
                            <span>{content.userName}</span>
                        </Item>
                        <Item>
                            <span className="info-text">资料简介:</span>
                            <span>{content.graduateSchool}</span>
                        </Item>
                        <Item>
                            <span className="info-text">上传时间:</span>
                            <span>{content.graduateMajor}</span>
                        </Item>
                        <Item>
                            <span className="info-text">价钱:</span>
                            <span>{content.graduateScore}</span>
                        </Item>
                        <Item>
                            <span className="info-text">资料类型:</span>
                            <span>{content.graduateScore}</span>
                        </Item>
                        <Item>
                            <span className="info-text">查看文件:</span>
                            <span>{content.graduateScore}</span>
                        </Item>
                    </Form>
                </div>
            </Modal>
        );
    }
}
