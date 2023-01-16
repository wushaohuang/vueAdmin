<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header style="height: 55px;">
        <Strong>后台管理</Strong>
        <div class="header-avatar">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
                      <span class="el-dropdown-link">
                        {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :underline="false">
                <router-link style="text-decoration: none;" :to="{name: 'UserCenter'}">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link :underline="false" href="https://www.zhuawaba.com/post/18">dev doc</el-link>
          <el-link :underline="false" href="https://space.bilibili.com/13491144">video</el-link>
        </div>
      </el-header>
      <el-main>
        <div style="margin: 0 15px;">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import SideMenu from "@/views/inc/SideMenu";
export default {
  name: "Home.vue",
  components: {
    SideMenu
  },
  data() {
    return {
      userInfo: {
        id: '-1',
        username: 'admin',
        avatar: 'http://www.gaoimg.com/uploads/allimg/170205/1-1F20512051Sa.jpg'
      }
    }
  }
}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-header {
  background-color: #17B3A3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding: 0;
}

.el-link {
  text-decoration: none;
}

</style>
