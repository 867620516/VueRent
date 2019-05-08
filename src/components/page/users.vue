<template>
<div class="container">
  <div class="user">
    <el-row>
      <el-col :span="8" :xs="24">
        <img class="avatar" :src="userProd[0].userIcon" alt="">
      </el-col>
      <el-col :span="16" :xs="24">
        <h4>{{userProd[0].userName}}</h4>
        <p>9999</p>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import { GetUserProds } from '../../api/api'
export default {
  name: 'users',
  data () {
    return {
      userProd: []
    }
  },
  created () {
    this.getThisUser()
  },
  methods: {
    getThisUser () {
      let userInfo = {
        id: this.$route.params.userID,
        username: this.$route.query.uname
      }
      GetUserProds(userInfo).then(res => {
        this.userProd = res.data
        console.log(res.data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../common/less/index.less';
.container {
  margin-top: 80px;
  .user {
    .learncontent;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      margin: 30px 0 5px 0;
    }
    .text-color {
      color: @color;
      font-size: 1rem;
      @media screen and (max-width: 768px) {
        font-size: .8rem;
      }
    }
  }
}
</style>
