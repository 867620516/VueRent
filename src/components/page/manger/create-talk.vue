<template>
<div>
  <div class="head">
    <h3>分享我的新鲜事</h3>
  </div>
  <el-row>
    <el-col>
      <div id="frame"
      >
        <img :src="imgurl" alt="">
        <VueEmoji ref="emoji" @input="onInput" width="60%" height="100" :value="myText"/>
        <div style="margin-top: 10px">
          <el-button style="float: left" size="small" type="success" @click="reset">清空</el-button>
          <el-button style="float: right" size="small" type="primary" @click="submit">发表</el-button>
        </div>
      </div>
    </el-col>
    <el-col>
      <div class="head" STYLE="margin-bottom: 20px">
        <h3>{{this.$route.name}}</h3>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col style="padding-left: 20px;padding-right: 30px">
      <el-card v-for="(item, index) in talkList" :key="index">
        <!--<div class="title">
          <router-link :to="'/talk/detail/' + item.id">
            <span class="tirtleFont lineThrou ">{{ item.title }}</span>
          </router-link>
        </div>-->
        <div class="info">
          <p style="text-align: left">{{ item.content }}</p>
        </div>
        <dl class="list-user-other">
          <dt>
            <router-link
              :to="{path:'/users/'+item.userID,query:{uname:item.userName}}"
              :key="item.userID"
              target="_blank"
            >
              <img
                :src="item.userIcon"
                style="width: 25px;height: 25px;border-radius: 100%;"
                alt=""/>
            </router-link>
          </dt>
          <dd>
            <router-link
              :to="{path:'/users/'+item.userID,query:{uname:item.userName}}"
              :key="item.userID"
              target="_blank"
            >
              <span style="color: black">{{ item.userName }}</span>
            </router-link>
          </dd>
          <div class="interval"></div>
          <dd>{{ dateGet(item.createTime) }}</dd>
          <div class="interval"></div>
          <div class="read-comment-info">
            <dd>
              <router-link :to="'/talk/detail/' + item.id">
                <span class="text">阅读数</span>
                <span class="num">{{ item.clickRate }}</span>
              </router-link>
            </dd>
            <div class="interval"></div>
            <dd>
              <router-link :to="'/talk/detail/' + item.id">
                <span class="text">评论数</span>
                <span class="num">{{ item.commentCount }}</span>
              </router-link>
            </dd>
          </div>
          <div class="right-info">
            <dd>
              <a @click="delPre(item.id)">
                <span class="del-text">删除</span>
              </a>
            </dd>
          </div>
        </dl>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>
<script>
import VueEmoji from 'emoji-vue'
import { AddTalk, getUserTalk } from '@/api/talkAPI'

export default {
  components: {
    VueEmoji
  },
  data () {
    return {
      myText: '',
      imgurl: require('@/assets/emoji/smile.png'),
      value: '',
      data: [],
      myTalk: {
        content: '',
        createTime: '',
        replyTime: '',
        userID: ''
      },
      talkList: [],
      /* 新建验证 */
      ruleNew: {
        title: [
          {
            type: 'string',
            required: true,
            message: '填写标题',
            trigger: 'blur'
          }
        ],
        content: [
          {
            type: 'string',
            required: true,
            message: '填写内容',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getTalk()
  },
  methods: {
    getTalk () {
      let talkInfo = {
        userID: this.$store.state.user.id
      }
      getUserTalk(talkInfo).then(res => {
        this.talkList = res.data
        console.log(res.data)
      })
    },
    submit () {
      this.myTalk.content = this.myText
      this.myTalk.createTime = new Date()
      this.myTalk.replyTime = new Date()
      this.myTalk.userID = this.$store.state.user.id
      AddTalk(this.myTalk).then(res => {
        console.log(res)
        this.$notify({
          title: '成功',
          type: 'success',
          message: '发表成功！',
          offset: 200
        })
        this.myText = ''
        this.getTalk()
      })
    },
    onInput (event) {
      // event.data contains the value of the textarea
      this.myText = event.data
      console.log(this.myText)
    },
    dateGet (e) {
      let time = new Date(e)
      return (
        time.getFullYear() +
        '-' +
        (time.getMonth() + 1) +
        '-' +
        time.getDate() +
        ' ' +
        time.getHours() +
        ':' +
        time.getMinutes()
      )
    },
    /* entity实体初始化 */
    initEntity () {
      this.entity.title = null
      this.entity.content = null
    },
    submitt (entity) {
      this.$refs[entity].validate(valid => {
        if (valid) {
          this.modal = true
        }
      })
    },
    publish () {
      this.modal_loading = true
      this.axios({
        method: 'post',
        url: '/talk',
        data: this.entity
      })
        .then(
          function (response) {
            if (response.data.status === '2000') {
              this.interestContent = this.interestContent + '.'
              this.initEntity()
              setTimeout(() => {
                this.modal_loading = false
                this.modal = false
                this.$router.push('/talk/create/success')
              }, 2000)
            } else if (response.data.status === '6001') {
              this.modal_loading = false
              this.$Message.error(response.data.message)
            }
          }.bind(this)
        )
        .catch(() => {
          this.$Message.error('新建失败')
        }
        )
    },
    reset () {
      this.myText = ''
      console.log('000' + this.myText)
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../../common/less/index.less';
  @import '../../../common/css/init.css';
  .head {
  .leftborder
  }
  .background {
    .learncontent
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  #frame {
    text-align: left;
    margin: 20px 30px ;
    width: 80%;
  }
  .list-user-other {
    height: 24px;
    line-height: 24px;
  }
  .list-user-other dt {
    float: left;
    margin: 0 6px 0 0;
  }
  .list-user-other dd {
    float: left;
    font-size: 14px;
    color: #8a8a8a;
    line-height: 24px;
    margin-inline-start: 5px
  }
  .list-user-other .read-comment-info {
    line-height: 24px;
    float: left;
  }
  .list-user-other .read-comment-info .text {
    margin-right: 4px;
    color: #8a8a8a;
  }
  .list-user-other .read-comment-info .num {
    color: #3399ea;
  }
  .list-user-other .right-info {
    line-height: 24px;
    float: right;
  }
  .list-user-other .right-info .text {
    color: #57a3f3;
  }
  .list-user-other .right-info .del-text {
    color: red;
  }
  .list-user-other .right-info .num {
    color: #3399ea;
  }
  .list-user-other a{
    text-decoration: none;
  }
  .interval {
    float: left;
    width: 1px;
    height: 12px;
    border-radius: 50%;
    background-color: #e0e0e0;
    margin-top: 6px;
    margin-left: 8px;
    margin-right: 8px;
  }
</style>
