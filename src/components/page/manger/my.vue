<template>
  <div>
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <div class="addprod">
      <h4>我的信息</h4>
      <el-row>
        <el-col :span="6" :xs="24">
          <img v-if="!imgDataUrl" class="avatar" :src=user.icon alt="">
          <img v-else class="avatar" :src="imgDataUrl" alt="">
          <br/>
          <el-button type="success" @click="toggleShow">修改头像</el-button>
        </el-col>
        <el-col :span="18" :xs="24">
          <el-form ref="addprod" :rules="rule" :model="Form" label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="Form.username"
                placeholder="用户名">
              </el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="Form.password"
                placeholder="密码">
              </el-input>
            </el-form-item>

            <el-form-item label="电子邮件" prop="email">
              <el-input
                type="email"
                v-model="Form.email"
                placeholder="电子邮件">
              </el-input>
            </el-form-item>

            <el-form-item label="电话号码" prop="phone">
              <el-input
                type="text"
                v-model.number="Form.phone"
                placeholder="电话号码">
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="submitBtn"
                @click.native.prevent="editUser"
                :loading="logining">
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <my-upload field="pic"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="50"
               :height="50"
               :params="userInfo"
               url="/api/uploadIcon"
               img-format="png">
    </my-upload>
  </div>
</template>

<script>
import { ReginUser } from '@/api/api'
import myUpload from 'vue-image-crop-upload'
export default {
  name: 'userinfo',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.Form = this.$store.state.user
  },
  components: {
    'my-upload': myUpload
  },
  data () {
    const telCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('电话号码是必须的'))
      } else if (!Number.isInteger(value)) {
        return callback(new Error('电话号码必须是数字'))
      } else if (value.toString().length !== 11) {
        return callback(new Error('电话号码必须是11位数字'))
      } else {
        callback()
      }
    }
    return {
      show: false,
      imgDataUrl: '',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      Form: {
        username: '',
        password: '',
        phone: '',
        email: ''
      },
      userInfo: {
        id: this.$store.state.user.id
      },
      logining: false,
      rule: {
        username: [
          {
            required: true,
            max: 14,
            min: 2,
            message: '用户名是必须的，长度为2-14位',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码是必须的！',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            validator: telCheck,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的电子邮件格式(xxx@xxx.com)',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    cropSuccess (imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess (jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      this.$store.state.user.icon = jsonData.message
      console.log('field: ' + field)
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail (status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    },
    toggleShow () {
      this.show = !this.show
    },
    editUser () {
      this.$refs.Form.validate(valid => {
        if (valid) {
          this.logining = true
          // console.log('开始写入后台数据！')
          // 这是要注册的数据
          let ReginParams = {
            username: this.ReginForm.username,
            password: this.ReginForm.password,
            phone: this.ReginForm.phone,
            email: this.ReginForm.email
          }
          // 调用借口，执行axios请求获取返回的数据
          ReginUser(ReginParams).then(res => {
            console.log(res)
            // 让注册按钮不要在转了
            this.logining = false
            // 让页面给个提示
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            // eslint-disable-next-line
              debugger
            let user = res.data
            // console.log(user)
            // 将返回的数据注入内存
            sessionStorage.setItem('user', JSON.stringify(user))
            // 在这里挂上，官方说的分发，登录的action
            // 应该这样就行了把
            this.$store.dispatch('login')
            // 跳转到我的信息的页面
            this.$router.push('/manger/my')
          })
        } else {
          console.log('submit err')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../../common/less/index.less';
  .head {
    .leftborder
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    margin: 0px 0 5px 0;
  }
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
