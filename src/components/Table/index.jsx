/**
 * @file table展示
 * @author zhangluyao
 */
import * as React from 'react';
import {Table, Checkbox, Button} from 'antd';

export default props => {
    const {dataSource, columns, form} = props;
    const {getFieldsValue, getFieldDecorator} = form;
    const {role} = getFieldsValue();

    const render = (text, row, index) => {
        if (text instanceof Object) {
            if (role.includes('创业者')) {
                if (text.isFree) {
                    return (
                        <span>
                            FREE
                            {
                                getFieldDecorator(`data.${text.name}.${index}.entrepreneur`)(
                                    <Checkbox
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
                            已预约
                            <Button
                                sie="small"
                                style={{marginLeft: 20, padding: 5}}
                                type="primary"
                                onClick={() => {
                                    props.handleCancel(row, text);
                                }}
                            >
                                取消
                            </Button>
                        </span>
                    );
                }
                if (text.entrepreneur && text.entrepreneur.length > 0) {
                    return text.entrepreneur;
                }
            }

            // 没有预约者
            if (!text.entrepreneur) {
                return (
                    <span>
                        {text.isFree ? 'FREE' : ''}
                        {
                            getFieldDecorator(`data.${text.name}.${index}.other`, {
                                initialValue: text.isFree
                            })(
                                <Checkbox
                                    disabled={text.name !== role || text.isFree}
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
