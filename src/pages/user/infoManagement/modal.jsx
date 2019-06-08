/**
 * @file 查看审核弹窗
 * @author zhangluyao01
 */
import React from 'react';
import {
    Modal,
    Form,
    Input,
    Upload,
    Button,
    Icon
} from 'antd';

const Item = Form.Item;
const TextArea = Input.TextArea;
const acceptFileType = ['word', 'ppt', 'pdf', 'jpg', 'png', 'mp3', 'wma', 'wav', 'mov', 'rmvb', 'mp4'];

class MaterialModal extends React.Component {
    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    handleOk() {
        // 先判断数据是否正确
        this.props.form.validateFields().then(() => {
            // 通过form-data的形式上传文件
            const formData = new FormData();
            const data = this.props.form.getFieldsValue();
            for (let key in data) {
                if (data.hasOwnProperty(key) && key !== 'fileList') {
                    formData.append(key, data[key]);
                }
            }

            data.fileList && data.fileList.forEach(item => {
                formData.append('files[]', item);
            });
            this.props.handleOk(formData);
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        let title = '上传资料';
        if (this.props.edit) {
            title = '编辑资料';
        }
        return (
            <Modal
            title={title}
            visible={this.props.visible}
            onOk={() => {
                this.handleOk();
            }}
            onCancel={this.props.handleCancel}
            okText="上传"
            cancelText="取消"
            >
                <Form>
                    <Item>
                        <span className="modal-form-span">资料名称:</span>
                        {getFieldDecorator('fileName', {
                            rules: [{required: true, message: '请资料名称!'}]
                        })(
                            <Input style={{width: 380}} placeholder="请输入最多24个字符" />
                        )}
                    </Item>
                    <Item>
                        <span className="modal-form-span">资料简介:</span>
                        {getFieldDecorator('fileIntroduction', {
                            rules: [{required: true, message: '请资料名称!'}]
                        })(
                            <TextArea autosize style={{width: 380}} placeholder="请输入最多100个字符" />
                        )}
                    </Item>
                    <Item>
                        <span className="modal-form-span" style={{display: 'inline-block', width: 60}}>价钱:</span>
                        {getFieldDecorator('price', {
                            rules: [{required: true, message: '请资料名称!'}]
                        })(
                            <Input style={{width: 60}} />
                        )}
                        <span style={{marginLeft: 10}}>元</span>
                    </Item>
                    <Item>
                        <span className="modal-form-span">上传文件:</span>
                        {getFieldDecorator('fileList', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile
                        })(
                            <Upload name="fileList" accept={acceptFileType.join(',')} beforeUpload={() => false} multiple={false}>
                                <Button>
                                    <Icon type="upload" />
                                </Button>
                            </Upload>
                        )}
                        <div style={{marginTop: 20, lineHeight: '18px'}}>文件支持上传: {acceptFileType.join('、')}格式</div>
                    </Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({name: 'material_Modal'})(MaterialModal);
