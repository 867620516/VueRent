<template>
  <div class="login">
    <el-dialog
      title="注册用户"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="signUpForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="signUpForm.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="signUpForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="signUpForm.phone" type="text"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="signUpForm.email" type="text"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="signUp">确 定</el-button>
  </span>
    </el-dialog>
    <img src="./../assets/logo.png" width="200" height="200">
    <h1>{{title}}</h1>
    <el-row v-show="signFlag">
      <el-col :span="8" :offset="8">
        <el-alert
          title="用户名密码错误"
          type="error">
        </el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-input placeholder="请输入用户名" v-model="username" @focus="signFlag=false">
          <template slot="prepend">用户名</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-input placeholder="请输入密码" show-password :type="password" v-model="password" @focus="signFlag=false">
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="8">
        <el-button @click="submit">提交</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="openSignUpDialog">注册</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Login.vue',
  data: function () {
    return {
      username: '',
      password: '',
      title: 'E-Rent',
      signFlag: false,
      dialogVisible: false,
      signUpForm: {
        username: '',
        password: '',
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    submit () {
      // 获取input框的数据>通过axios提交数据
      let username = this.username
      let password = this.password
      // 用axios发送post请求
      /* eslint-disable */
        window.axios.post('/api/signIn', { username, password }).then(res => {
          // eslint-disable-next-line
          // 1.跳转到首页
          if (res.data.username!=null){
            let sess = window.sessionStorage;
            let d = JSON.stringify(res.data);
            sess.setItem('userInfo',d)
            this.$router.push({
              path: '/index'
            })
          }else { console.log("-------")}
        }).catch(() => {
          this.signFlag = true
        })
      },
      openSignUpDialog () {
        this.dialogVisible = true
      },
      signUp () {
        this.dialogVisible = false
        window.axios.post('/api/signUp',this.signUpForm).then(res => {
          this.$message({
            message:'用户注册成功',
            type: success
          })
        })
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .login {
    margin-top: 5rem;
  }
  h1 {
    font-weight: normal;
  }
</style>
