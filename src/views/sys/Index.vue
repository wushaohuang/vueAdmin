<template>
  <!-- type="flex" justify="center" 令el-row居中 -->
  <el-row type="flex" justify="center" class="row-bg">
    <el-col :xl="12">
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
  </el-row>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {}
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
}
</style>
