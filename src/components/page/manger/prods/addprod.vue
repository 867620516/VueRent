<template>
  <!-- 新增商品 -->
  <div class="addprod">
    <h4>新增商品</h4>
    <el-form ref="addprod" :rules="prodrules" :model="addprod" label-width="80px">
      <el-form-item label="商品名" prop="itemName">
        <el-input v-model="addprod.itemName" placeholder="请输入商品名"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="rentalPrice">
        <el-input v-model.number="addprod.rentalPrice" placeholder="请输入商品价格"></el-input>
      </el-form-item>
      <el-form-item label="商品主图" prop="image">
         <!--<el-upload
          class="prod-image"
          action="/learn/upload"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="cur-image">
          <i v-else class="el-icon-plus prod-uploader-icon"></i>
        </el-upload>-->
        <!--<qiniu-upload width="200" height="200" fontSize="40" ref="qnupload"></qiniu-upload>-->
      </el-form-item>
      <!--<el-form-item label="商品类别" prop="typename">
        <el-select v-model="addprod.typename" placeholder="请选择商品类别">
          <template v-for="item in products">
            <el-option :label="item.name" :value="item.name" :key="item.type"></el-option>
          </template>
        </el-select>
      </el-form-item>

      <el-form-item label="商品类名">
        <el-input v-model="addprod.type" disabled></el-input>
      </el-form-item>-->
      <el-form-item label="商品数量" prop="amount">
        <el-input-number v-model="addprod.amount" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="租金时段" prop="rentalInterval">
        <el-select v-model="addprod.rentalInterval" placeholder="请选择" value="tian">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否全新" prop="brandNew">
        <el-switch
          style="display: block"
          v-model="addprod.brandNew"
          active-color="#13ce66"
          active-value=true
          inactive-value=false
          active-text="十成新"
          inactive-text="非全新">
        </el-switch>
      </el-form-item>
      <el-form-item label="可否讲价" prop="bargain">
        <el-switch
          style="display: block"
          v-model="addprod.bargain"
          active-color="#13ce66"
          active-value=true
          inactive-value=false
          active-text="接受讲价"
          inactive-text="不接受">
        </el-switch>
      </el-form-item>
      <el-form-item label="所在地区" prop="district">
        <el-cascader
          size="large"
          :options="dist"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="所需押金" prop="depositPrice">
        <el-input v-model.number="addprod.depositPrice" placeholder="请输入所需押金"></el-input>
      </el-form-item>
      <el-form-item label="商品简介" prop="description">
        <el-input type="textarea" v-model="addprod.description" placeholder="请请输入商品简介"></el-input>
      </el-form-item>

      <el-form-item label="商品详情" prop="info">
        <!--<mavon-editor  ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="addprod.info"></mavon-editor>-->
        <!--<md-upload ref="newmd"></md-upload>-->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="newprod">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import {UploadFile} from '../../../api/api'
// eslint-disable-next-line
import { NewProd } from '../../../../api/api'
import { provinceAndCityData, CodeToText } from '@/data/app'
export default {
  data () {
    return {
      dist: provinceAndCityData,
      options: [{
        value: '天',
        label: '天'
      }, {
        value: '周',
        label: '周'
      }, {
        value: '月',
        label: '月'
      }, {
        value: '年',
        label: '年'
      }],
      imageUrl: '',
      products: [],
      addprod: {
        itemName: '',
        rentalPrice: '',
        /* type: '',
        typename: '', */
        amount: '',
        rentalInterval: '',
        brandNew: '',
        bargain: '',
        district: '',
        depositPrice: '',
        description: ''
      },
      prodrules: {
        itemName: [
          {
            required: true,
            message: '请输入商品名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 50,
            message: '长度在 3 到 50 个字',
            trigger: 'blur'
          }
        ],
        rentalPrice: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '价格必须是数字',
            trigger: 'blur'
          }
        ],
        rentalInterval: [
          {
            required: true,
            message: '必须选择租金时段',
            trigger: 'change'
          }
        ],
        district: [
          {
            required: true,
            message: '商品所在地区是必须的！',
            trigger: 'blur'
          }
        ],
        depositPrice: [
          {
            required: true,
            message: '押金是必须的！',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入商品简介',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    'addprod.typename': function (val) {
      // console.log(val)
      // console.log(this.products)
      const CurProduct = this.products.filter(p => {
        return p.name === this.addprod.typename
      })
      // console.log(CurProduct)
      this.addprod.type = CurProduct[0].type
      // console.log(this.addprod.type)
    },
    deep: true
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    handleChange (value) {
      this.addprod.district = CodeToText[value[0]] + CodeToText[value[1]]
      console.log(this.addprod.district)
    },
    // 获取所有商品分类
    /* getproducts () {
      let getproductspar = {
        type: 'all'
      }
      GetProducts(getproductspar).then(res => {
        this.products = res.data.products
      })
    }, */
    // 新增一个商品
    newprod () {
      this.$refs.addprod.validate(valid => {
        if (valid) {
          let addprodpar = {
            // 另一种写法
            itemName: this.addprod.itemName,
            rentalPrice: this.addprod.rentalPrice,
            amount: this.addprod.amount,
            rentalInterval: this.addprod.rentalInterval,
            brandNew: this.addprod.brandNew,
            bargain: this.addprod.bargain,
            district: this.addprod.district,
            userID: this.$store.state.user.id,
            depositPrice: this.addprod.depositPrice,
            description: this.addprod.description
          }
          console.log(addprodpar)
          NewProd(addprodpar).then(res => {
            console.log(res)
            this.$notify({
              title: '成功',
              type: 'success',
              message: res.data.msg,
              offset: 200
            })
            this.$refs.addprod.resetFields()
            this.$router.push('/manger/mangeprods/allprods')
          })
        } else {
          this.$notify({
            title: '警告!',
            type: 'warning',
            message: '请先完成验证',
            offset: 200
          })
        }
      })
    }
  },
  mounted () {
    // this.getproducts()
  }
}
</script>
<style lang="less" scoped>
@import '../../../../common/less/index.less';
.addprod {
  .learncontent;
  .el-form {
    text-align: left;
    .el-select {
      width: 100%;
    }
    .el-switch {
      margin: 10px 0 0 0;
    }
    .prod-image {
      width: 200px;
      height: 200px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .cur-image {
        width: 100%;
      }
      .prod-uploader-icon {
        font-size: 45px;
        color: #8c939d;
        width: 200px;
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
    }
  }
}
</style>
