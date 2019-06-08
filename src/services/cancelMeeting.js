/**
 * @file addPartner
 * @author zhangluyao
 */
import axios from 'axios';

export default data => {
    return axios({
        method: 'post',
        url: '/cancelMeeting',
        data
    });
};
