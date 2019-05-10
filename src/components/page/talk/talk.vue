<template>
  <div id="mywork">
    <el-row style="margin-top: 80px;margin-bottom: 40px">
      <el-col :span="16" :offset="4">
        <u-p></u-p>
        <el-card
          v-for="(item, index) in talkList"
          :key="index"
          class="card-body"
        >
          <router-link
            :to="'/talk/detail/'+ item.id"
            :key="item.id"
            style="text-decoration: none"
          >
            <div class="info">
              <p style="text-align: left;font-size: larger;font-weight: bolder;color: rgba(0,14,26,0.81)">{{ item.content }}</p>
            </div>
          </router-link>
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
                <span style="color: #2c3e50">{{ item.userName }}</span>
              </router-link>
            </dd>
            <div class="interval"></div>
            <dd>{{ dateGet(item.createTime) }}</dd>
            <div class="right-info">
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
          </dl>
        </el-card>
        <!--<div style="margin-top: 20px">
          <Page
            :total="total"
            :page-size="pageInfo.pageSize"
            show-elevator
            show-total
            @on-change="
              e => {
                pageSearch(e);
              }
            "
          ></Page>
        </div>-->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getUserTalk } from '../../../api/talkAPI'
import UP from '../../up'
export default {
  components: {
    UP
  },
  data () {
    return {
      searchContent: null,
      talkList: [],
      total: 0,
      pageInfo: {
        page: 0,
        pageSize: 20
      }
    }
  },
  created () {
    this.getTalk()
  },
  methods: {
    getTalk () {
      let talkInfo = {
        userID: ''
      }
      getUserTalk(talkInfo).then(res => {
        this.talkList = res.data
        console.log(res.data)
      })
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
    getArticle (e) {
      this.axios({
        method: 'get',
        url: '/public/articles',
        params: {
          page: e.pageInfo.page,
          pageSize: e.pageInfo.pageSize,
          searchContent: this.searchContent
        }
      })
        .then(
          function (response) {
            this.articleList = response.data.data.data
            this.total = response.data.data.totalCount
          }.bind(this)
        )
        .catch(function (error) {
          alert(error)
        })
    },
    pageSearch (e) {
      this.pageInfo.page = e - 1
      this.getArticle({
        pageInfo: this.pageInfo
      })
    }
  }
}
</script>
<style scoped>
  .card-body {
    padding: 0px;
  }
  .content {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
  .chat {
    display: inline;
    margin-right: 50px;
    color: #f90;
  }
  .chat span {
    margin-left: 2px;
  }
  .title {
    margin-bottom: 8px;
  }
  .title span {
    color: #2d64b3;
  }
  .info {
    margin-bottom: 5px;
  }
  .info p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
    white-space: nowrap;
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
  .list-user-other .right-info {
    line-height: 24px;
    float: right;
  }
  .list-user-other .right-info .text {
    margin-right: 4px;
    color: #8a8a8a;
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
