<!--
2022-11-09 [早] 学到的东西
$axios是ajax封装的库，用于异步请求接口数据，
$refs 用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例。ref 需要在dom渲染完成后才会有，在使用的时候确保dom已经渲染完成。比如在生命周期 mounted(){} 钩子中调用，或者在 this.$nextTick(()=>{}) 中调用。可通过[ this.$refs.标签的ref ]获取指定标签带着的数据
$store 状态管理有5个核心，分别是state、getter、mutation、action以及module；
localStorage.setItem("token",token) /* 将token存储到token字段 */
this.$router.push("/index")相当于a标签跳转，会跳转到指定路径
axios特点: （开始请求 -> 请求拦截器 -> 响应拦截器 -> 请求结束）
  · 基于promise的异步ajax请求库
    · axios(config)	通用/最本质的发任意类型请求的方式
  · 浏览器端/node端都可以使用
  · 支持请求/响应拦截器
    · axios.interceptors.request.use()	添加请求拦截器
    · axios.interceptors.response.use()	添加响应拦截器
  · 支持请求取消
    · axios.Cancel()	用于创建取消请求的错误对象
  · 请求/响应数据转换
  · 批量发送多个请求
-->
<template>
  <!-- type="flex" justify="center" 令el-row居中 -->
  <el-row type="flex" justify="center" class="row-bg">
    <el-col :xl="6" :lg="7">
      <div class="login-form">
        <h2>欢迎来到vueAdmin系统</h2>
        <el-image
            style="width: 180px; height: 180px"
            :src="require('@/assets/markerhub/MarkerHub.jpg')">
        </el-image>
        <p>
          author: Shawn
        </p>
        <a href="https://www.zhuawaba.com/post/18">
          System Document
        </a>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :xl="6" :lg="7">
      <el-form label-position="right" :rules="rules" label-width="80px" :model="loginForm" ref="loginForm">
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"  style="width: 380px;">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code"  style="width: 380px;">
          <el-input v-model="loginForm.code"  style="width: 172px; float: left" maxlength="5"></el-input>
          <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import qs from 'qs'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        code: '11111',
        token: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 5, max:5, message: '验证码为5个字符', trigger: 'blur'}
        ]
      },
      captchaImg: null
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login?' + qs.stringify(this.loginForm)).then(res => {
            const jwt = res.headers['authorization']
            this.$store.commit("SET_TOKEN", jwt)
            this.$router.push("/index")
          })

        } else {
          console.log('error submit!');
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {
        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.base64Img
        this.loginForm.code = ''
      })
    }
  },
  created() {
    this.getCaptcha()
  }
}
</script>

<style scoped>
  .el-col {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
  }
  .el-row {
    height: 100%;
    background-color: #fafafa;
  }
  .el-divider {
    height: 200px;
  }
  .captchaImg {
    float: left;
    margin-left: 8px;
    border-radius: 4px;
  }
</style>
