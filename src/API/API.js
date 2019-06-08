/**
 * @file 页面所有的API
 * @author zhangluyao01
 */

/**
 * 一些意见
 * 1. 希望所有引起数据变化的请求，后端能够把变化后的数据返回，
 * 比如添加了一个用户，添加成功后，后端将用户列表做为响应返回
 * 2. 希望采用cookie保留登录状态并添加一个自动登录的接口，
 * 现在前端的操作是把后端返回的userToken保留再内存中来保留登录状态
 * 一旦刷新页面，内存数据晴空万里又得重新登录。有了cookie和自动登录的接口后，
 * 每次刷新页面，自动登录接口就会携带cookie访问后端，来判断这个用户是否是合法用户
 */

export default {
    xzLogin: '/xz/login', // 没有学长端登录接口
    xzMaterialDel: '/xz/material/del',
    xzMaterialList: '/xz/material/list', // 空数据，希望能给一些假数据，方便调试
    xzMaterialPutOn: '/xz/material/put_on',
    xzMaterialPullOff: '/xz/material/pull_off',
    xzMaterialUpdate: '/xz/material/update',
    xzMaterialUpload: '/xz/material/upload',
    xzOrderMaxMoney: '/xz/order/max_money', // 没有获取最大提现金额的接口
    xzOrderWithdraw: '/xz/order/withdraw', // 没有提现的接口
    xzOrderList: '/xz/order/list', // 空数据，希望能给一些假数据，方便调试
    // 管理端登录接口
    adminLogin: '/admin/login', // 只返回了token没有返回用户名，账户就是用户名吗？
    adminVcode: '/admin/vcode',
    // 管理端审核管理
    adminXzDetail: '/admin/xz/detail', // 响应返回字段都是空值
    adminXzList: '/admin/xz/list', // 没有数据，能不能给一些假数据? 搜索要用这个接口吗，用的话query的格式？
    adminXzPullOff: '/admin/xz/pull_off', // 请求错误，错误码400
    adminXzPutOn: '/admin/xz/put_on', // 请求错误，错误码400
    adminXzReject: '/admin/xz/reject', // 请求错误，错误码400
    adminXzSuccess: '/admin/xz/success', // 请求错误，错误码400
    // 管理端资料审核的所有接口都没有给, 下面是我自己定义的
    adminMaterialDetail: '/admin/material/detail',
    adminMaterialList: '/admin/xz/list',
    adminMaterialPullOff: '/admin/xz/pull_off',
    adminMaterialPutOn: '/admin/xz/put_on',
    adminMaterialReject: '/admin/xz/reject',
    adminMaterialSuccess: '/admin/xz/success',
    // 管理端用户管理
    adminUserAdd: '/admin/user/add', // 接口400，确定这个接口是get请求，还有数据格式和给的设计图上的交互有出入?
    adminUserDel: '/admin/user/del', // 又是400报错
    adminUserDisable: '/admin/user/disable', // 同样是400报错
    adminUserList: '/admin/user/list', // 搜索复用这个接口的话给出query形式
    adminUserEdit: '/admin/user/edit', // 缺少编辑用户的接口
    adminUserEditRole: '/admin/user/role' // 缺少分配角色的接口
};
