<template>
  <section class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <!-- 子菜单路由 -->
    <div class="menu">
      <el-menu
        mode="horizontal"
        :default-active="$route.path"
        router>
          <el-menu-item
            v-for="item in route"
            :key="item.path"
            :index="item.path">
            {{item.name}}
          </el-menu-item>
        </el-menu>
    </div>
    <!-- 渲染路由 -->
    <transition name="el-zoom-in-center">
      <router-view></router-view>
    </transition>
  </section>
</template>
<script>
export default {
  // ..
  props: ['pathName'],
  computed: {
    route () {
      let pathName = this.pathName
      console.log(this.$route)
      console.log('3287359849')
      // eslint-disable-next-line
      // debugger
      const culRoutes = this.$router.options.routes[0].children[3]
      const resRoute = culRoutes.children.filter(r => {
        return r.name === pathName
      })

      // this.$router.options.routes[0].children[3].children[1].children
      return resRoute[0].children
    }
  }
}
</script>
<style lang="less" scoped>
@import '../common/less/index.less';
.box {
  .head {
    .leftborder
  }
  .menu {
    margin: 0 15px;
  }
}
</style>
