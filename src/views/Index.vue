<template>
  <div>
    <el-container>
      <el-header>
        <el-row style="margin-top: 15px;">
          <el-col :span="6" :offset="2">
            <el-button>tu</el-button>
          </el-col>
          <el-col :span="12">
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" v-model="inputSearch" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row id="nav" style="margin-bottom: 20px;">
          <el-col></el-col>
          <el-col>
            <el-menu
              :default-active="1"
              class="el-menu-demo"
              mode="horizontal"
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
              <el-menu-item index="3">订单管理</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col></el-col>
          <el-col :span="10" :offset="7">
            <el-carousel height="250px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col  v-if="showuser" :span="7">
            <el-col :span="3">
              <img style="margin-top: 10px;border-radius: 50%;border-style: solid;border-color: #0a0f1f;"
                   height="60" v-bind:src=userInfo.icon></el-col>
            <el-col :span="10" :offset="2" style="margin-top: 25px">
              <a style="font-family: '微软雅黑 Light';color: darkgray;">Hi！{{userInfo.username}}，</a>
              <el-button type="text" style="font-family: '微软雅黑 Light';color: darkgray;" @click="logout">退出</el-button>
              <el-button style="border-radius: 15px" @click="print">注册</el-button>
            </el-col>
          </el-col>
          <el-col v-else :span="7">
            <img style="margin-top: 10px" height="80" src="../assets/defaulticon.png"><br/>
            <p style="font-family: '微软雅黑 Light';color: darkgray;">Hi！欢迎来到惠民</p>
            <el-button type="primary" style="border-radius: 15px" @click="toLogin">登录</el-button>
            <el-button style="border-radius: 15px">注册</el-button>
          </el-col>
        </el-row>
        <el-row id="show">
          <el-col :span="4" v-for="(rental,index) in rentalList" :key="index+19">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/pailide1.jpg" width=100% class="image">
              <div style="padding: 14px;">
                <span>{2}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <!--<el-col :span="4">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/erji.jpg" width=100% class="image">
              <div style="padding: 14px;">
                <span>无线耳机 迷你超小</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/erji.jpg" width=100% class="image">
              <div style="padding: 14px;">
                <span>无线耳机 迷你超小</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>-->
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index.vue',
  data: function () {
    return {
      inputSearch: '',
      // eslint-disable-next-line
      userInfo: null,
      rentalList: []
    }
  },
  created () {
    this.userInfo = JSON.parse(window.sessionStorage.userInfo)
    this.searchAll()
  },
  computed: {
    showUser: function () {
      return this.userInfo != null
    }
  },
  methods: {
    searchAll () {
      // eslint-disable-next-line
      //debugger
      var that = this
      window.axios.post('/api/rental').then(res => {
        // eslint-disable-next-line
        debugger
        console.log(that.rentalList)
        for (let index in res.data) {
          this.rentalList.push(res.data[index])
        }
      }).catch(() => {
        alert('cuowu')
      })
    },
    toLogin () {
      this.$router.push({ path: '/login' })
    },
    logout () {
      window.sessionStorage.removeItem('userInfo')
      window.location.reload()
    },
    print () {
      console.log(window.sessionStorage.userInfo)
    }
  }
}
</script>

<style scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  #show el-col {
    margin-right: 30px;
    margin-bottom: 30px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
.el-submenu{
  font-family: 方正姚体,serif !important;
}
  .el-menu-item  {
    font-family: 方正姚体,fantasy !important;
  }
</style>
