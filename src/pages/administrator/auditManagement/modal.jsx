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
                    <div className="img-container">
                        <img className="img-avatar" src={content.avatar} />
                    </div>
                    <Form className="self-form">
                        <Item>
                            <span className="info-text">姓名:</span>
                            <span>{content.userName}</span>
                        </Item>
                        <Item>
                            <span className="info-text">读研院校:</span>
                            <span>{content.graduateSchool}</span>
                        </Item>
                        <Item>
                            <span className="info-text">读研专业:</span>
                            <span>{content.graduateMajor}</span>
                        </Item>
                        <Item>
                            <span className="info-text">考研分数:</span>
                            <span>{content.graduateScore}</span>
                        </Item>
                    </Form>
                </div>
                <div style={{marginTop: 10}}>学生证照片及手持学生证照片</div>
                <div style={{display: 'flex'}}>
                    {
                        content.profileList && content.profileList.map((item, index) => (
                            <div className="img-container" key={index}>
                                <img className="img-avatar" src={item} />
                            </div>
                        ))
                    }
                </div>
            </Modal>
        );
    }
}
