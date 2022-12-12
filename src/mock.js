
const Mock = require('mockjs')

const Random = Mock.Random
let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}

Mock.mock(RegExp('/login*'),'get', (config) => {
    console.log("mock---------------------------------------login")
    return Result
})

Mock.mock('/captcha','get',() => {
    Result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage("120x40","1111")
    }
    return Result
})

Mock.mock('/sys/menu/nav', 'get', () => {
    let nav = [
        {
            name: 'SysManga',
            title: '系统管理',
            icon: 'el-icon-s-operation',
            path: '',
            component: '',
            children: [
                {
                    name: 'SysUser',
                    title: '用户管理',
                    icon: 'el-icon-s-custom',
                    children: []
                }
            ]
        },
        {
            name: 'SysTools',
            title: '系统工具',
            icon: 'el-icon-s-tools',
            path: '',
            children: [
                {
                    name: 'SysDict',
                    title: '数字字典',
                    icon: 'el-icon-s-order',
                    path: '/sys/dicts',
                    children: []
                }
            ]
        }
    ]
    //权限数据
    let authoritys = ['SysUser', 'SysUser:save']

    Result.data = {}
    Result.data.nav = nav
    Result.data.authoritys = authoritys
    return Result
})
