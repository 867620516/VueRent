<template>
<div class="container">
  <el-row>
    <el-col :span="16" :offset="4">
      <el-row class="user">
        <el-col :span="4">
          <img class="avatar" :src="thisUser.icon" alt="">
        </el-col>
        <el-col :span="6" style="text-align: left;">
          <table border="1px" cellpadding="0" cellspacing="0"
                 style="height: 144px;border-left-style:solid; border-bottom-style:none;border-right-style:none;border-top-style:none">
            <h4>{{thisUser.username}}</h4>
            <span>{{thisUser.email}}</span>
            <p style="font-size: small">关注<span class="text-color">{{thisUser.following}}</span>人 粉丝<span class="text-color">{{thisUser.follower}}</span>人</p>
        </table>
        </el-col>
        <el-col :span="14" style="text-align: left;">
          <table border="1px" cellpadding="0" cellspacing="0"
                 style="height: 144px;border-left-style:solid; border-bottom-style:none;border-right-style:none;border-top-style:none">
            <div style="margin-top: 1.33em">
              <span v-if="thisUser.profile">{{thisUser.profile}}</span>
              <span v-else>这个人很懒，什么也没写</span>
            </div>
            <div class="Fbtn">
              <el-button type="warning" plain size="medium"><span style="font-size: medium">关注</span></el-button>
            </div>
          </table>
        </el-col>
      </el-row>
      <el-row class="main">
        <template v-if="userProd.length===0">
          <div style="margin-bottom: 30px">该用户还未发布任何闲置物品~
          </div>
        </template>
        <template v-else v-for="item in userProd">
          <el-col :span="7" :xs="22"  class="item hvr-float-shadow" :key="item.id">
            <router-link
              :to="'/product/1/'+item.id"
              :key="item.id">
              <img class="hvr-bob" style="object-fit: cover;width: 90%;height: 400px;padding: 10px;border-radius: 15px;" :src="item.imageList[0]" >
            </router-link>
            <!--<img class="hvr-bob" :src="'@/assets/'+item.imageList[0]">-->
            <div class="onpic">
              <p v-if="item.brandNew" class="hot">十成新</p>
              <p v-else class="nhot">非全新</p>
            </div>
            <h3 class="rentalName">{{item.itemName}}</h3>
            <p class="intro">{{item.description}}</p>
            <!--<p class="sellnum">历史销量:<span>{{item.sellnum}}</span></p>-->
            <div style="float: none">
              <div class="price">租价:<span class="textOld">{{item.rentalPrice}}</span><span class="interval"> /{{item.rentalInterval}}</span></div>
              <div style="float: right;margin-right: 10px">
                <router-link
                  :to="{path:'/users/'+item.userID,query:{uname:item.userName}}"
                  :key="item.userID">
                  <img id="avatar" v-bind:src=item.userIcon alt=""><span class="uuuu">{{item.userName}}</span>
                </router-link>
              </div>
            </div>
          </el-col>
        </template>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { GetUserProds, LoginUser } from '../../api/api'
export default {
  name: 'users',
  data () {
    return {
      userProd: [],
      thisUser: ''
    }
  },
  mounted () {
    this.getThisUser()
    this.getUser()
  },
  methods: {
    getUser () {
      let userInfo = {
        id: this.$route.params.userID,
        username: this.$route.query.uname
      }
      // let that = this
      LoginUser(userInfo).then(res => {
        this.thisUser = res.data
        console.log(this.thisUser)
      })
    },
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
  @import '../../common/css/hover.css';
  @import '../../common/less/index.less';
.container {
  margin-top: 80px;
  .user {
    margin: 20px 15px;
    box-shadow: 0 0 5px @color;
    border-radius: 10px;
    padding: 10px;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      margin: 20px 0 20px 0;
    }
    .text-color {
      color: @color;
      font-size: 1rem;
      @media screen and (max-width: 768px) {
        font-size: .8rem;
      }
    }
    .Fbtn {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }

  a {
    text-decoration: none;
    color: #999;
  }
  a:hover {
    color: #669966;
  }
  .title {
    height: 60px;
    border-left: 4px solid #669966;
    margin: 0 15px;
    background-color: #f2f3f2;
    text-align: left;
    padding-left:20px;
    line-height: 60px;
  }
  .main {
    position: relative;
    #avatar {
      width: 20px;
      height: 20px;
      margin-top: 20px;
      border-radius: 10px;
      cursor: pointer;
    }
    .item {
      margin: 25px 10px;
      /* background: #f2f3f2; */
      box-shadow: 0 5px 5px #ccc;
      border-top: 1px solid #ccc;
      /* border: 1px solid #ccc; */
      border-radius: 15px;
      .onpic {
        position: absolute;
        top: 20px;
        right: 20px;
        opacity: .7;
        .hot {
          background: #bb4945;
          color: rgb(231, 228, 228);
          margin: 0;
          padding: 5px 12px;
          border-radius: 15px;
          display: inline-block;
        }
        .nhot {
          background: #dad7d5;
          color: rgb(61, 57, 57);
          margin: 0;
          padding: 5px 12px;
          display: inline-block;
        }
      }
      /*img {
        width: 90%;
        height: 400px;
        padding: 10px;
        border-radius: 15px;
      }*/
    }
  }

  .intro {
    height: 60px;
    overflow: hidden;/*超出部分隐藏*/
    /*white-space: nowrap;!*不换行*!*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
  }
  .intro,.sellnum {
    margin: 0 15px 0 20px;
    text-align: left;
    color: #666;
    line-height: 2;
    letter-spacing: 1.2;
  }
  .price {
    margin: 0 15px 0 20px;
    color: #666;
    float: left;
    line-height: 2;
    letter-spacing: 1.2;
  }
  .uuuu {
    color: #666;
    line-height: 2;
    letter-spacing: 1.2;
  }
  .link {
    text-align: right;
    font-size: 16px;
    margin-right: 40px;
  }
  .price,.sellnum {
    color: gray;
  }
  .textOld {
    color: red;
    font-size: 25px;
  }
  .interval {
    color: dimgray;
    font-size: 16px;
  }
  .textThr {
    // color: #290c09;
    // font-size: 20px;
    text-decoration: line-through;
  }
  .rentalName {
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
  }
}
</style>
