<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <p></p>
        <div class="menu">
          <div class="user">
            <el-row>
              <el-col>
                <img class="avatar" :src=user.icon alt="">
              </el-col>
              <el-col>
                <h4>{{user.username}}</h4>
                <!--<p>代理级别：<span class="text-color">{{sender.role}}</span>，折扣<span class="text-color">{{sender.zhekou}}折</span></p>
                <p>共发货<span class="text-color">{{sender.total}}</span>件</p>
                <p>离达到<span class="text-color">{{sender.next}}</span>还需再发货<span class="text-color">{{sender.num}}</span>件</p>-->
              </el-col>
              <el-col>
                <p style="font-size: small">租赁物品<span class="text-color">{{rentalNum}}</span>件 关注<span class="text-color">{{folloing}}</span>人 粉丝<span class="text-color">{{follower}}</span>人</p>
              </el-col>
            </el-row>
          </div>
          <el-menu
          :default-active="$route.path"
          router>
            <el-menu-item
              v-for="item in $router.options.routes[0].children[3].children"
              :key="item.path"
              :index="item.path">
              {{item.name}}
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <transition name="el-zoom-in-center">
          <router-view :key="key"></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { GetUserProds, GetFollowerNum, GetFollowingNum } from '../../api/api'
// import bus from '../../common/js/bus'
export default {
  data () {
    return {
      rentalNum: '',
      follower: '',
      folloing: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    key () {
      return this.$route.path
    }
  },
  methods: {
    getRentalNum () {
      let userInfo = {
        username: this.$store.state.user.username,
        id: this.$store.state.user.id
      }
      GetUserProds(userInfo).then(res => {
        console.log(res)
        this.rentalNum = res.data.length
      })
    },
    getFollowerNum () {
      let info = {
        id: this.$store.state.user.id
      }
      GetFollowerNum(info).then(res => {
        this.follower = res.data.length
      })
    },
    getFollowingNum () {
      let info = {
        id: this.$store.state.user.id
      }
      GetFollowingNum(info).then(res => {
        this.folloing = res.data.length
      })
    }
  },
  mounted () {
    console.log(this.$router)
    this.getFollowerNum()
    this.getFollowingNum()
    this.getRentalNum()
    /* this.$store.dispatch('sended')
    this.$store.dispatch('products')
    this.$store.dispatch('prods') */
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/index.less';
.container {
  margin-top: 80px;
  .menu {
    position: fixed;
    top: 62px;
    // background: @color;
    width: 23%;
    bottom: 0;
    box-shadow: 1px 0 1px #ccc;
    z-index: 3;
    .el-menu {
      // background: @color;
      border: none;
      margin-top: 20px;
      .el-menu-item {
        color: @color;
        text-align: center;
        padding: 0 !important;
        padding-left: 0 !important;
        &:hover {
          color: #eee;
          // font-weight: bold !important;
          background: @color;
        }
      }
    }
    .is-active {
      color: #eee !important;
      // font-weight: bold !important;
      background: @color !important;
    }
  }
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
