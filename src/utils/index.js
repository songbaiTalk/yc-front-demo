/**
 * @file 项目中用到的一些工具函数
 * @author zhangluyao01
 */
import {notification} from 'antd';

export function showNotification(response) {
    // 请求成功
    if (response.code === 0) {
        notification.success({
            message: '成功',
            description: response.message
        });
    } else {
        notification.error({
            message: '错误',
            description: response.message
        });
    }
}