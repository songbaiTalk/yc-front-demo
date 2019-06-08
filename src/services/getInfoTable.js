/**
 * @file 请求table数据
 * @author zhangluyao01
 */
import axios from 'axios';

export default data => {
    return axios({
        method: 'post',
        url: '/getInfoTable',
        data
    });
};
