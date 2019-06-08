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
                        getFieldDecorator('name')(
                            <Input placeholder="搜索姓名/订单号" />
                        )
                    }
                </Item>
                <Item>
                    <span className="self-text">订单类型</span>
                    {
                        getFieldDecorator('orderType', {initialValue: '0'})(
                            <Select style={{width: 200, marginRight: 20}}>
                                <Option value="0">全部</Option>
                                <Option value="1">支出</Option>
                                <Option value="2">收入</Option>
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
