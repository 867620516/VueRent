<template>
  <div class="section">
    <!-- 搜索商品 -->
    <div class="serchprod">
      <h4>搜索商品</h4>
      <!-- 搜索框 -->
      <el-input class="serch-input" v-model="prodName" placeholder="请输入确切的商品名">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button class="serch-btn" @click="SerchProd" :disabled="disable" type="primary">搜索</el-button>
    </div>
    <!-- 所有商品 -->
    <div class="allprod">
      <h4>所有商品</h4>
      <el-table
        :data="prods"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          prop="itemName"
          label="商品名"
          min-width="40%">
          <!--<router-link
            :to="'/product/1/'+.id"
            :key="item.id">
            <img class="hvr-bob" src="@/assets/erji.jpg" >
          </router-link>-->
        </el-table-column>
        <el-table-column
          prop="rentalPrice"
          label="价格"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="image"
          label="图片"
          min-width="20%">
          <template slot-scope="scope">
            <img class="table-image" :src="scope.row.image" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="typename"
          label="类型"
          min-width="10%"
          :filters="productsFilter"
          :filter-method="filterType"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              close-transition>{{scope.row.typename}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          min-width="20%"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click.stop="EditProd(scope.$index, scope.row)">编辑商品</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑商品 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="90%">
      <el-form ref="editprod" :rules="prodrules" :model="editprod">
        <el-form-item label="商品名" prop="itemName">
          <el-input v-model="editprod.itemName" placeholder="请输入商品名"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="rentalPrice">
          <el-input v-model.number="editprod.rentalPrice" placeholder="请输入商品价格"></el-input>
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
          <el-input-number v-model="editprod.amount" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="租金时段" prop="rentalInterval">
          <el-select v-model="editprod.rentalInterval" placeholder="请选择" value="tian">
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
            v-model="editprod.brandNew"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value=false
            inactive-value=true
            active-text="非全新"
            inactive-text="十成新">
          </el-switch>
        </el-form-item>
        <el-form-item label="可否讲价" prop="bargain">
          <el-switch
            style="display: block"
            v-model="editprod.bargain"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value=false
            inactive-value=true
            active-text="不接受"
            inactive-text="接受讲价">
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
          <el-input v-model.number="editprod.depositPrice" placeholder="请输入所需押金"></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="description">
          <el-input type="textarea" v-model="editprod.description" placeholder="请请输入商品简介"></el-input>
        </el-form-item>

        <el-form-item label="商品详情" prop="info">
          <!--<mavon-editor  ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="addprod.info"></mavon-editor>-->
          <!--<md-upload ref="newmd"></md-upload>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exitEdit">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { GetUserProds, SearchMyList, NewProd } from '../../../../api/api'
import { provinceAndCityData, CodeToText } from '@/data/app'
export default {
  // ..
  data () {
    return {
      prodName: '',
      productsFilter: [],
      prods: [],
      products: [],
      dialogFormVisible: false,
      imageUrl: '',
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
      editprod: {
        id: '',
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
  computed: {
    disable () {
      if (this.prodName.length !== 0) {
        return false
      } else {
        return true
      }
    },
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    'editprod.typename': function (val) {
      // console.log(val)
      // console.log(this.products)
      const CurProduct = this.products.filter(p => {
        return p.name === this.editprod.typename
      })
      // console.log(CurProduct)
      this.editprod.type = CurProduct[0].type
      // console.log(this.addprod.type)
    },
    deep: true
  },
  methods: {
    handleCurrentChange (val) {
      console.log(val)
      this.$router.push({
        path: '/product/1/' + val.id
      })
    },
    handleChange (value) {
      this.addprod.district = CodeToText[value[0]] + CodeToText[value[1]]
      console.log(this.addprod.district)
    },
    // 搜索商品
    SerchProd () {
      let searchparams = {
        id: this.$store.state.user.id,
        searchName: this.prodName
      }
      SearchMyList(searchparams).then(res => {
        // console.log(res)
        if (res.data.length === 0) {
          this.$notify({
            title: '很抱歉',
            message: '没有搜索到符合的商品！',
            type: 'warning',
            offset: 200
          })
          this.prodName = ''
        } else {
          this.$notify({
            title: '成功',
            message: '共搜索到' + res.data.length + '件商品',
            type: 'success',
            offset: 200
          })
          this.prods = res.data
          this.prodName = ''
        }
      })
    },
    // 获取所有商品类
    /* getproducts () {
      let productsPar = {
        type: 'all'
      }
      GetProducts(productsPar).then(res => {
        // console.log(res)
        const Oproducts = res.data.products
        this.products = res.data.products
        for (let i = 0; i < Oproducts.length; i++) {
          this.productsFilter.push({
            text: Oproducts[i].name,
            value: Oproducts[i].name
          })
        }
        // console.log(this.productsFilter)
      })
    }, */
    // 获取所有商品
    getallprods () {
      let userInfo = {
        username: this.$store.state.user.username,
        id: this.$store.state.user.id
      }
      GetUserProds(userInfo).then(res => {
        console.log(res)
        this.prods = res.data
      })
    },
    // 通过商品类型过滤显示商品
    filterType (value, row) {
      // console.log('value', value)
      // console.log('row', row)
      return row.typename === value
    },
    // 编辑商品
    EditProd (row, rowIndex) {
      this.editprod = rowIndex
      this.imageUrl = rowIndex.image
      this.dialogFormVisible = true
      // console.log(this.imageUrl)
    },
    // 退出编辑商品
    exitEdit () {
      this.dialogFormVisible = false
    },
    // 确认修改并提交
    submitEdit () {
      this.$refs.editprod.validate(valid => {
        if (valid) {
          let addprodpar = {
            // 另一种写法
            id: this.editprod.id,
            itemName: this.editprod.itemName,
            rentalPrice: this.editprod.rentalPrice,
            amount: this.editprod.amount,
            rentalInterval: this.editprod.rentalInterval,
            brandNew: this.editprod.brandNew,
            bargain: this.editprod.bargain,
            district: this.editprod.district,
            userID: this.$store.state.user.id,
            depositPrice: this.editprod.depositPrice,
            description: this.editprod.description
          }
          console.log(addprodpar)
          NewProd(addprodpar).then(res => {
            console.log(res)
            this.$notify({
              title: '成功',
              type: 'success',
              message: res.data.edit,
              offset: 100
            })
            this.dialogFormVisible = false
            this.getallprods()
          })
        } else {
          this.$message({
            type: 'danger',
            message: '请验证后再提交修改'
          })
        }
      })
    }
  },
  mounted () {
    // ..
    // this.getproducts()
    this.getallprods()
  }
}
</script>
<style lang="less" scoped>
@import '../../../../common/less/index.less';
.section {
  .serchprod {
    .learncontent;
    .serch-input {
      width: 70%;
    }
    .serch-btn {
      width: 29%;
    }
  }
  .allprod {
    .learncontent;
    .table-image {
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }
  }
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
