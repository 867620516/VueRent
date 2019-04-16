<template>
 <div class="container">
   <!-- head -->
   <div class="head">
     <el-row>
       <el-col class="left" :span="12" :xs="24">
         <!--<img class="prodimg" src="@/assets/youke1.jpg" alt="">-->
         <el-carousel indicator-position="outside">
           <el-carousel-item v-for="item in 4" :key="item">
             <img class="run" src="@/assets/youke1.jpg" alt="">
           </el-carousel-item>
         </el-carousel>
       </el-col>
       <el-col class="right" :span="12" :xs="24">
          <h3 v-text="prod.itemName"></h3>
          <p v-text="prod.description"></p>
          <div class="info">
            <p class="price">租  价：
              <span :class="hasuser">￥{{prod.rentalPrice}} / {{prod.rentalInterval}}    </span>
              <template v-if="!prod.bargain">
                <i class="el-icon-warning" style="color: #ffcc00;font-size: small"></i>
                <span style="color: #ffcc00;font-size: small" >该商品拒绝讲价！</span>
              </template>
            </p>
            <!--<p v-if="user">折扣价：<span class="yprice">￥{{prod.price * user.zhekou * 0.1}}</span></p>-->
            <p>成 色：
              <span v-if="prod.brandNew" class="hot">十成新</span>
              <span v-else class="nhot">非全新</span>
            </p>
            <p>所在地区：{{prod.district}}</p>
            <p>发布日期：{{dateA}}</p>
            <p>押    金：￥{{prod.depositPrice}}</p>
          </div>
          <div class="action">
            <el-button type="danger" @click="tosend" :disabled="disabled">立刻去发货</el-button>
            <el-button type="info" @click="back">返回浏览其它商品</el-button>
          </div>
         </el-col>
     </el-row>
   </div>
   <!-- body -->
   <div class="body">
     <h4 class="tit">产品详情</h4>
     <!-- <mavon-editor
     class="md"
     :value="prop.value"
     :subfield = "prop.subfield"
     :default_open = "prop.default_open"
     :toolbarsFlag = "prop.toolbarsFlag"
     :editable="prop.editable"
     :scrollStyle="prop.scrollStyle"
     ></mavon-editor> -->
     <!--<md-show :key="prod._id" :mdvalue="prod.info"></md-show>-->
   </div>
 </div>
</template>
<script>
import { GetProd } from '../../../api/api'
export default {
  data () {
    return {
      prod: {},
      imageList: ''
    }
  },
  computed: {
    // ...
    dateA () {
      let date = new Date(this.prod.arrivalDate)

      let Y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      var t = Y + '年' + m + '月' + d + '日'
      return t
    },
    user () {
      return this.$store.getters.sender
    },
    hasuser () {
      if (this.user) {
        return 'nprice'
      } else {
        return 'yprice'
      }
    },
    disabled () {
      if (this.prod.selling) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    CurProd () {
      // eslint-disable-next-line
      // debugger
      let params = {
        id: this.$route.params.productid
      }
      GetProd(params).then(res => {
        console.log(res)
        this.prod = res.data
      })
    },
    tosend () {
      this.$router.push('/manger/send')
    },
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.CurProd()
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
.container {
  width: 100%;
  margin: 65px auto;
  max-width: 1280px;
  .head {
    text-align: left;
    border-bottom: 1px solid rgba(92, 97, 92, .3);
    .left {
      padding: 10px 10px;
      border-right:  1px solid rgba(51, 112, 51, 0.2);
      .prodimg {
        width: 100%;
        border: 1px solid rgba(92, 97, 92, .3);
        border-radius: 15px;
      }
      .run {
        height: 100%;
      }
    }
    .right {
      padding: 5px 10px 10px 10px;
      .info {
        color: rgb(116, 114, 114);
        padding: 5px 10px;
        border: 1px solid rgba(196, 190, 190, .4);
        border-radius: 5px;
        // font-size: 14px;
        .yprice {
          color: red;
          font-size: 20px;
          margin-right: 10px;
        }
        .nprice {
          text-decoration: line-through;
        }
        .hot {
          background: #bb4945;
          color: rgb(231, 228, 228);
          margin: 0;
          padding: 5px 12px;
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
      .action {
        padding: 10px 5px;
      }
    }

  }
  .body {
    .tit {
      .leftborder;
      margin: 20px 0;
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel {
    margin-top: 20px;
  }
  .el-carousel__item {
    text-align: center;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>
