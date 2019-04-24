<template>
<el-row  class="footer">
  <el-col :span="8">
    <h3>footer</h3>
  </el-col>
  <el-col :span="16">
    <p class="copy">Copyright © 2015-2018.有限公司.All Rights Reserved.</p>
    <p class="beian">ICP备案号：</p>
  </el-col>
</el-row>

</template>
<script>
export default {
}
</script>

<style lang="less" scoped>
@import '../common/less/index.less';
.footer {
  width: 100%;
  box-shadow: 0 -1px 1px @color;
  margin: 0px;
  background: #fff;
  z-index: 10;
  .logo {
    width: 240px;
    height: 60px;
    margin: 10px 0 0 0;
    @media screen and (max-width:768px) {
      width: 100%;
      height: 45px;
      margin: 15px 0 0 0;
    }
  }
}
</style>
