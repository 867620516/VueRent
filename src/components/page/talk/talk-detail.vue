<template>
  <div id="mywork">
    <el-row style="margin-top: 80px">
      <el-col :span="16" :offset="4">
        <div class="whole">
          <div>
            <div class="title line-height-40 font-size-22">
              {{ thisTalk.content}}
            </div>
            <dl class="list-user-other">
              <dt>
                <router-link
                  :to="{path:'/users/'+thisTalk.userID,query:{uname:thisTalk.userName}}"
                  :key="thisTalk.userID"
                  target="_blank"
                >
                  <img
                    :src="thisTalk.userIcon"
                    style="width: 25px;height: 25px;border-radius: 100%;"
                  />
                </router-link>
              </dt>
              <dd>
                <router-link
                  :to="{path:'/users/'+thisTalk.userID,query:{uname:thisTalk.userName}}"
                  :key="thisTalk.userID"
                  target="_blank"
                >
                  <span style="color: #666;">{{ thisTalk.userName }}</span>
                </router-link>
              </dd>
              <dd>
                <span class="text">阅读数:</span>
                <span class="num">{{ thisTalk.clickRate }}</span>
              </dd>
              <dd>{{ dateGet(thisTalk.createTime) }}</dd>
            </dl>
            <!--<div class="content" v-html="thisTalk.content"></div>-->
          </div>

          <div class="comment-append-section" id="commentAppendArea" style="text-align: right;margin-top: 25px">
            <!-- <Input v-model="commentAppend" v-show="!appendActive" @on-focus="toggleInput"
                              prefix="ios-create" placeholder="添加评论" />

                      <Input v-show="appendActive" v-model="commentAppend"
                             @on-blur="toggleInput" ref="commentInputDom"
                             type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="添加评论" /> -->
            <el-input
              v-model="commentAppend"
              @focus="focusInput"
              ref="commentInputDom"
              type="textarea"
              :rows="commentAppendInput"
              placeholder="添加评论"
            />

            <el-button
              style="margin-top: 10px"
              type="primary"
              size="small"
              @click="publishComment()"
            >发表评论</el-button
            >
          </div>
          <div style="margin-top:20px">
            <hr align="left" noshade="noshade" size="1" width="100%"/>
          </div>

          <div class="comment-section">
            <!-- <div class="reply-count">
                          {{total}}条回复
                      </div> -->

            <ul class="reply-list">
              <li v-if="comments.length==0" style="text-align: left;color: dimgray;font-family: '微软雅黑 Light'">还没人评论，快来抢沙发~</li>
              <li
                v-else
                v-for="(comment, index) in comments"
                class="reply-item"
                :key="comment.id"
              >
                <div class="user">
                  <router-link
                    :to="{path:'/users/'+comment.userID,query:{uname:comment.userName}}"
                    :key="comment.userID"
                    target="_blank"
                  >
                    <img
                      class="avatar"
                      :src="comment.userIcon"
                      :title="comment.userName"
                      alt=""/>
                  </router-link>
                  <div class="title-info">
                    <router-link
                      :to="{path:'/users/'+comment.userID,query:{uname:comment.userName}}"
                      :key="comment.userID"
                      target="_blank"
                    >
                    <span class="user-name">{{ comment.userName }}</span>
                    </router-link>>
                    <span># {{ index + 1 }} 楼 • {{ latestTimeFormat(comment.createTime) }}</span>
                  </div>
                  <div class="title-info-other">
                  <span>
                    <a
                      v-show="!comment.showContent"
                      @click="changeContent(index)"
                    >查看回复({{ comment.childCommentsCount }})</a
                    >
                    <a
                      v-show="comment.showContent"
                      @click="changeContent(index)"
                    >收起回复</a
                    >
                    <a @click="writeComment(comment, 1)">回复</a>
                  </span>
                  </div>
                </div>
                <div class="reply-info">
                  <div class="reply-content">
                    {{ comment.comment }}
                  </div>
                </div>
                <ul v-show="comment.showContent" class="reply-child-list">
                  <li
                    v-for="(replyComment) in comment.childComments"
                    class="reply-item"
                    :key="replyComment.id"
                  >
                    <div class="reply-info">
                      <div class="title-info">
                        <router-link
                          :to="{path:'/users/'+replyComment.userID,query:{uname:replyComment.userName}}"
                          :key="replyComment.userID"
                          target="_blank"
                        >
                          <img
                            class="avatar"
                            :src="replyComment.userIcon"
                            :title="replyComment.userName"
                          />
                        </router-link>
                        <div class="title-info-right">
                          <router-link
                            :to="{path:'/users/'+replyComment.userID,query:{uname:replyComment.userName}}"
                            :key="replyComment.userID"
                            target="_blank"
                          >
                          <span class="user-name">{{
                            replyComment.userName
                          }}</span>
                          </router-link>
                          <span>回复</span>
                          <span class="user-name"
                          >{{ replyComment.replierName }}:</span
                          >
                          <span>{{ replyComment.comment }}</span>
                          <span class="reply-time"
                          >({{ replyComment.creatTimeBy }})</span
                          >
                          <a @click="writeComment(replyComment, 2)">回复</a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>

            <!--<Page
              v-if="total > 10"
              class="pagin"
              :total="total"
              size="small"
              show-elevator
              @on-change="
                e => {
                  pageSearch(e);
                }
              "
            />-->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTalkById, writeComment, getComments } from '../../../api/talkAPI'

export default {
  data () {
    return {
      thisTalk: {
        id: '',
        content: '',
        clickRate: '',
        commentCount: '',
        createTime: '',
        userID: '',
        userName: '',
        userIcon: ''
      },
      comments: [],
      page: 0,
      pageSize: 10,
      total: 0,
      commentAppend: '',
      commentAppendInput: 1,
      talkComment: {
        talkID: null,
        talkOwnerId: null,
        userID: null,
        parentID: null,
        comment: null,
        replierID: null,
        replierName: null,
        createTime: null
      }
    }
  },
  created () {
    this.getThisTalk()
    this.getComments()
  },
  methods: {
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
    getThisTalk () {
      getTalkById({
        id: this.$route.params.talkid
      }).then(res => {
        this.thisTalk = res.data
        console.log(this.thisTalk)
      })
    },
    talkCommentInit () {
      this.talkComment.talkID = null
      this.talkComment.parentID = null
      this.talkComment.comment = null
      this.talkComment.replierID = null
      this.userID = null
      this.talkComment.replierName = null
      this.talkComment.talkOwnerId = null
      this.talkComment.createTime = null
    },
    getComments () {
      getComments({ talkid: this.$route.params.talkid }).then(res => {
        let data = res.data
        console.log(data)
        for (let comment of data) {
          comment.creatTimeBy = this.latestTimeFormat(comment.createTime)
          comment.showContent = false
          for (let replyComment of comment.childComments) {
            replyComment.creatTimeBy = this.latestTimeFormat(
              replyComment.createTime
            )
          }
        }
        this.comments = data
        this.total = data.totalCount
      })
    },
    focusInput (event) {
      this.commentAppendInput = 3
    },
    writeComment (e, sign) {
      this.commentAppendInput = 3

      var anchor = this.$el.querySelector('#commentAppendArea')
      document.body.scrollTop = anchor.offsetTop // chrome
      // document.documentElement.scrollTop = anchor.offsetTop; // firefox
      if (sign === 1) {
        this.talkComment.talkID = this.thisTalk.id
        this.talkComment.parentID = e.id
        this.talkComment.comment = null
        this.talkComment.replierID = e.userID
        this.talkComment.replierName = e.userName
      } else if (sign === 2) {
        this.talkComment.talkID = this.thisTalk.id
        this.talkComment.parentID = e.parentID
        this.talkComment.comment = null
        this.talkComment.replierID = e.userID
        this.talkComment.replierName = e.userName
      }
      this.commentAppend = '[reply]' + e.userName + '[/reply]\n'
    },
    publishComment () {
      if (
        this.$store.state.user == null ||
        this.$store.state.user === ''
      ) {
        this.$message.error('请登录')
        return
      }
      if (this.commentAppend == null || this.commentAppend === '') {
        this.$message.error('请输入评论')
        return
      }

      if (this.talkComment.replierName != null) {
        // eslint-disable-next-line
        // debugger
        var str = this.commentAppend.substring(
          0,
          15 + this.talkComment.replierName.length
        )
        var validate = '[reply]' + this.talkComment.replierName + '[/reply]'
        if (str === validate) {
          this.talkComment.comment = this.commentAppend.substring(
            str.length
          )
          this.talkComment.talkOwnerId = this.thisTalk.userID
          this.talkComment.createTime = new Date()
          this.talkComment.userID = this.$store.state.user.id
          this.postComment(this.talkComment)
        } else {
          this.postComment({
            talkID: this.thisTalk.id,
            comment: this.commentAppend,
            talkOwnerId: this.thisTalk.userID,
            createTime: new Date(),
            userID: this.$store.state.user.id
          })
        }
      } else {
        // eslint-disable-next-line
        debugger
        this.postComment({
          talkID: this.thisTalk.id,
          comment: this.commentAppend,
          talkOwnerId: this.thisTalk.userID,
          createTime: new Date(),
          userID: this.$store.state.user.id
        })
      }
    },
    postComment (e) {
      writeComment(e).then(res => {
        this.$message.success('评论成功')
        this.getComments()
        this.talkCommentInit()
        this.commentAppend = null
      }).catch(() => {
        this.$message.error('评论失败，请稍后重试！')
      })
    },
    changeContent (index) {
      var temp = this.comments[index]
      temp.showContent = !temp.showContent
      this.comments.splice(index, 1, temp)
    },
    pageSearch (e) {
      this.page = e - 1
      this.getComments()
    },
    latestTimeFormat (time) {
      if (!time) {
        return ''
      }
      let differ = new Date(new Date() - new Date(time))

      let result = differ.getFullYear() - 1970
      if (result) {
        return result + '年前'
      }
      result = differ.getMonth()
      if (result) {
        return result + '月前'
      }
      result = differ.getDate() - 1
      if (result) {
        return result + '天前'
      }
      result = differ.getHours() - 8
      if (result) {
        return result + '小时前'
      }
      result = differ.getMinutes()
      if (result) {
        return result + '分钟前'
      }
      result = differ.getSeconds()
      if (result) {
        return result + '秒前'
      }
    }
  }
}
</script>
<style scoped lang="less">
  @import '../../../common/less/index.less';
  .title {
    color: black;
    text-align: left;
  }
  a {
    text-decoration: none;
  }
  .whole {
    margin: 20px 15px;
    box-shadow: 0 0 5px @color;
    border-radius: 10px;
    padding: 10px;
    /*@media screen and (max-width: 768px) {
      margin: 10px 1px;
      padding: 2px;
    }*/
  }
  .list-user-other {
    margin: 10px 0px;
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
    margin-right: 10px;
    margin-inline-start: 5px
  }

  .list-user-other .text {
    margin-right: 4px;
    color: #8a8a8a;
  }

  .list-user-other .num {
    color: #3399ea;
  }

  .content {
    overflow: hidden;
  }
  .content img {
    max-width: 100%;
  }

  .comment-section {
    flex-direction: column;
    background-color: #fff;
    overflow: hidden;

    ul {
      list-style: none;
      padding-inline-start: 10px
    }

    image {
      margin-right: 10px;
      border-radius: 6px;
    }

    .avatar {
      margin-right: 6px;
      border-radius: 20px;
      width: 26px;
      height: 26px;
    }

    .reply-count {
      padding: 12px 15px;
      background-color: #eee;
    }

    .reply-list {
      display: flex;
      flex-direction: column;

      .reply-item {
        display: flex;
        padding: 12px 15px;
        border-bottom: 1px solid #f0f0f0;
        flex-direction: column;

        .user {
          flex: 0 0 26px;

          .avatar {
            margin-right: 6px;
            border-radius: 20px;
            width: 26px;
            height: 26px;
            float: left;
          }
          .title-info {
            text-align: left;
            font-size: 12px;
            float: left;
            margin-top: 4px;

            .user-name {
              margin: 0 4px;
              color: #666;

              &:hover {
                color: #385f8a;
              }
            }
          }
          .title-info-other {
            font-size: 12px;
            float: left;
            margin: 4px 0 0 20px;

            a {
              margin: 0 5px;
            }
          }
        }
        .reply-child-list {
          margin-left: 32px;
          border-left: 4px solid #c5c5c5;

          .title-info {
            font-size: 12px;
            float: left;
            margin-top: 4px;

            .user-name {
              margin: 0 4px;
              color: #666;

              &:hover {
                color: #385f8a;
              }
            }
            .avatar {
              margin-right: 6px;
              border-radius: 20px;
              width: 26px;
              height: 26px;
              float: left;
            }
            .title-info-right {
              float: left;
              margin-top: 4px;

              .reply-time {
                padding: 0 20px;
              }
            }
          }
        }
      }

      .reply-hightlight {
        background-color: #f4fcf0;
      }

      .reply-info {
        display: flex;
        flex-direction: column;

        text {
          margin-left: 20px;
        }
      }

      .up-info {
        flex-grow: 1;
        justify-content: flex-end;
        color: #808080;

        image {
          width: 50px;
          height: 50px;
        }

        .up-count {
          margin-left: 0;
        }
      }
    }

    .reply-content {
      text-align: left;
      padding: 10px 20px 0 0;
      font-size: 14px;
    }

    .pagin {
      margin: 10px 15px;
    }
  }
</style>
