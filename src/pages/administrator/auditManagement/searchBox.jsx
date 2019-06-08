/**
 * @file 搜索框
 * @author zhangluyao01
 */
import React from 'react';
import {Form, Input, Select, Button} from 'antd';

const Item = Form.Item;
const Option = Select.Option;
class SearchBox extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <Item>
                    {
                        getFieldDecorator('userName')(
                            <Input placeholder="搜索姓名" />
                        )
                    }
                </Item>
                <Item>
                    <span className="self-text">上架状态</span>
                    {
                        getFieldDecorator('sellState', {initialValue: '0'})(
                            <Select style={{width: 200, marginRight: 20}}>
                                <Option value="0">全部</Option>
                                <Option value="1">上架</Option>
                                <Option value="2">下架</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    <span className="self-text">审核状态</span>
                    {
                        getFieldDecorator('approveStatus', {initialValue: '0'})(
                            <Select style={{width: 200, marginRight: 20}}>
                                <Option value="0">全部</Option>
                                <Option value="1">未审核</Option>
                                <Option value="2">已通过</Option>
                                <Option value="3">已驳回</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    <Button onClick={
                        () => {
                            const value = this.props.form.getFieldsValue();
                            this.props.handleSearch(value);
                        }
                    } type="primary" style={{width: 80}}>搜索</Button>
                </Item>
            </Form>
        );
    }
}

export default Form.create({name: 'searchBox'})(SearchBox);
