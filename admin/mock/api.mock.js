import { defineMock } from 'vite-plugin-mock-dev-server'
import Mock from 'mockjs';


const Random = Mock.Random
const mockFn = Mock.mock

// 定义一个名为 resultSuccess 的函数，用于生成成功的响应结果
function resultSuccess(result, message = 'success') {
    // 使用 Mock.mock 方法生成模拟的响应数据
    // Mock 是一个用于生成模拟数据的库
    return Mock.mock({
        // 设置响应的 code 为 0，表示成功
        code: 0,
        // 设置响应的 data 为传入的 result 参数，即实际的数据内容
        data: result,
        // 设置响应的 message，默认为 'success'，可以通过第二个参数的 message 属性进行覆盖
        message,
        // 设置响应的 timestamp 为当前时间的时间戳，用于记录响应生成的时间
        timestamp: new Date().getTime(),
    });
}
  
// 定义一个名为 resultError 的函数，用于生成错误结果对象
function resultError(message = 'Request failed', { code = 500, result = null } = {}) {
    // message 参数是错误信息的默认值，如果调用时没有传入，则默认为 'Request failed'
    // 第二个参数是一个对象，包含 code 和 result 两个属性，使用对象解构赋值，并设置默认值
    // 如果调用时没有传入这个对象，则默认值为 { code: 500, result: null }
    // 返回一个包含错误信息的对象
    return {
        // code 属性，表示错误代码，默认值为 500
      code,
        // data 属性，表示错误结果，默认值为 null
      data: result,
        // message 属性，表示错误信息，使用传入的 message 参数
      message,
        // type 属性，表示结果类型，固定为 'error'
      type: 'error',
    };
}
// 用户信息
const mockUsers = [
    {
      id: 1,
      username: 'admin',
      password: '123456',
      nickname: '三棵杨树',
      avatar: 'https://avatars.githubusercontent.com/u/64878070?v=4',
      sign: '从来没有真正的绝境，只有心灵的迷途',
      token: 'adminToken',
    },
    {
      id: 2,
      username: 'test',
      password: '123456',
      nickname: '测试账号',
      avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
      sign: '水光潋滟晴方好，山色空蒙雨亦奇',
      token: 'testToken',
    },
    {
      id: 3,
      username: 'guest',
      password: '123456',
      nickname: '访客',
      avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
      token: 'guestToken',
    },
];

// 登录接口
const mockLogin = {
    url: '/api/login',
    method: 'POST',
    delay: 500,
    body: ({ body }) => {
        const { account, password } = body;
        const userData = mockUsers.find((item) => item.username === account && item.password === password);
        if (!userData) {
            return resultError('帐号或密码不正确');
        }

        const { token, ...rest } = userData;
        return resultSuccess({ user: rest, token });
    },
}
// 登出
const mockLogout = {
    url: '/api/logout',
    delay: 500,
    body: () => {
        return resultSuccess({})
    },
}
// 注册
const register = {
    url: '/api/register',
    method: 'POST',
    delay: 500,
    body: ({ body }) => {
        console.log('body: ', body);
        const { account, password } = body;
        const userData = mockUsers.find((item) => item.username === account);
        if (userData) {
            return resultError('帐号已存在');
        }
        const newUser = {
            id: Random.integer(5, 8),
            username: account,
            password,
            nickname:account,
            avatar: Random.image('200x200', Random.color(), '#FFF', account),
            sign: Random.ctitle(),
            token: `${Random.string(7, 10)}Token`,
        }
        mockUsers.push(newUser);
        return resultSuccess(newUser, '注册成功');
        
    }
}

// 上传接口
const upload = {
    url: '/api/upload',
    method: 'POST',
    body(req) {
      const body = req.body
      console.log('body: ', body);
      return resultSuccess({
        list: body.files.map((file) => file.originalFilename)
      }, '上传成功')
    },
}
const mockList =  [
    mockLogin, mockLogout,register,
]

export default defineMock(mockList)