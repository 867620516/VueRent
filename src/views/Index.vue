<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col></el-col>
          <el-col :span="8" offset="16">
            <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#ffda44"
              text-color="#000000"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="1">处理中心</el-menu-item>
              <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu>
              <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index.vue',
  data: function () {
    return {
      username: JSON.parse(window.sessionStorage.userInfo).username
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #ffda44
}
  .el-menu {
    font-size: 100px;
    font-family: 方正姚体,fantasy;
  }
</style>
