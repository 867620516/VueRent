<template>
  <div>
    <div class="serch">
      <!-- 搜索框 -->
      <el-input
      type="text"
      class="el-input"
      placeholder="请输入商品名"
      v-model="searchName">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button
        type="primary"
        :disabled="disabled"
        @click="search"
        :loading="loading">
        搜索
      </el-button>
    </div>
    <div class="title">
      <h1 v-text="$route.params.class"></h1>
    </div>
    <!-- <p>共{{productlist.length}}个商品</p> -->
    <el-row class="main">
      <template v-for="item in productlist">
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
    <!-- 分页 -->
    <!-- <div class="page">
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        @current-change="handleCurrentChange"
        :page-size="12">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import { GetProds, SearchProductList } from '../../../api/api'
export default {
  data () {
    return {
      productlist: [], // 商品列表
      searchName: '',
      loading: false
    }
  },
  methods: {
    /* handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }, */
    // 获取商品
    getprods () {
      // 获取分类列表
      let params = null
      if (this.$route.params.class === '全部商品') {
        params = {
          type: 'all'
        }
      } else {
        params = {
          typename: this.$route.params.class
        }
      }
      GetProds(params).then(res => {
        console.log(res)
        this.productlist = res.data
      })
    },
    // 搜索商品
    search () {
      this.loading = true
      let searchparams = {
        searchName: this.searchName
      }
      SearchProductList(searchparams).then(res => {
        this.loading = false
        // console.log(res)
        if (res.data.length === 0) {
          this.$notify({
            title: '很抱歉',
            message: '没有搜索到符合的商品！',
            type: 'warning',
            offset: 200
          })
          this.searchName = ''
        } else {
          this.$notify({
            title: '成功',
            message: '共搜索到' + res.data.length + '件商品',
            type: 'success',
            offset: 200
          })
          this.productlist = res.data
          this.searchName = ''
        }
      })
    }
  },
  computed: {
    disabled () {
      if (this.searchName === '') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.getprods()
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/css/hover.css';
@import '../../../common/less/index.less';
.serch {
  margin: 20px 10px;
  .el-input {
    width: 70%;
  }
  .el-button {
    width: 28%;
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
</style>
