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
                            <Input placeholder="搜索用户名称/id" />
                        )
                    }
                </Item>
                <Item>
                    <span className="self-text">用户角色</span>
                    {
                        getFieldDecorator('userStatus', {initialValue: '2'})(
                            <Select style={{width: 200, marginRight: 20}}>
                                <Option value="2">全部</Option>
                                <Option value="1">审核人员</Option>
                                <Option value="0">管理员</Option>
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
