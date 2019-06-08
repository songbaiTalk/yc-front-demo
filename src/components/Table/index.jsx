/**
 * @file table展示
 * @author zhangluyao
 */
import * as React from 'react';
import {Table, Checkbox} from 'antd';

export default props => {
    const {dataSource, columns, form} = props;
    const {getFieldsValue, getFieldDecorator} = form;
    const {role} = getFieldsValue();

    const render = (text, row, index) => {
        if (text instanceof Object) {
            if (role.includes('创业者')) {
                if (text.entrepreneur && text.entrepreneur.length > 0) {
                    return text.entrepreneur;
                }
                if (!text.isFree) {
                    return (
                        <span>
                            可预约
                            {
                                getFieldDecorator(`data.${text.name}.${index}`)(
                                    <Checkbox
                                        disabled={text.name !== role}
                                        style={{marginLeft: 20}}
                                    />
                                )
                            }
                        </span>
                   );
                }
                if (text.entrepreneur === role) {
                    return (
                        <span>
                            可取消
                            {
                                getFieldDecorator(`data.${text.name}.${index}`, {
                                    initialValue: true
                                })(
                                    <Checkbox
                                        disabled={text.name !== role}
                                        style={{marginLeft: 20}}
                                    />
                                )
                            }
                        </span>
                    );
                }
            }

            // 没有预约者
            if (!text.entrepreneur) {
                return (
                    <span>
                        {text.isFree ? 'free' : '已确认'}
                        {
                            getFieldDecorator(`data.${text.name}.${index}`, {
                                initialValue: !text.isFree
                            })(
                                <Checkbox
                                    disabled={text.name !== role || !text.isFree}
                                    style={{marginLeft: 20}}
                                />
                            )
                        }
                    </span>
                );
            }
            return text.entrepreneur;
        }
        return text;
    };

    const columnsWithRender = columns.map(item => ({
        ...item,
        render
    }));

    return (
        <Table
            columns={columnsWithRender}
            dataSource={dataSource}
            bordered
            pagination={false}
        />
    );
};
