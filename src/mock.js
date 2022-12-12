
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
            "id": 1,
            "title": "系统管理",
            "icon": "el-icon-s-operation",
            "path": "",
            "name": "sys:manage",
            "component": "",
            "children": [
                {
                    "id": 2,
                    "title": "用户管理",
                    "icon": "el-icon-s-custom",
                    "path": "/sys/users",
                    "name": "sys:user:list",
                    "component": "sys/User",
                    "children": []
                },
                {
                    "id": 3,
                    "title": "角色管理",
                    "icon": "el-icon-rank",
                    "path": "/sys/roles",
                    "name": "sys:role:list",
                    "component": "sys/Role",
                    "children": []
                },
                {
                    "id": 4,
                    "title": "菜单管理",
                    "icon": "el-icon-menu",
                    "path": "/sys/menus",
                    "name": "sys:menu:list",
                    "component": "sys/Menu",
                    "children": []
                }
            ]
        },
        {
            "id": 5,
            "title": "系统工具",
            "icon": "el-icon-s-tools",
            "path": "",
            "name": "sys:tools",
            "component": null,
            "children": [
                {
                    "id": 6,
                    "title": "数字字典",
                    "icon": "el-icon-s-order",
                    "path": "/sys/dicts",
                    "name": "sys:dict:list",
                    "component": "sys/Dict",
                    "children": []
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
