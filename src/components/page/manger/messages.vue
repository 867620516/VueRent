<template>
  <div class="unread-msg-wrapper">
    <Card
      v-for="item in messages"
      :key="item.id"
      class="msg-card-item"
    >
      <div @click="read(item.id, item.isread)">
        <div class="synopsis">
          <Avatar
            shape="square"
            icon="person"
            :src="item.replyUserHeadimg"
            :title="item.replyUsername"
          />

          <span class="user-name">{{ item.replyUsername }}</span>
          <span class="time">{{ dateGet(item.replytime) }}</span>
          <span>回复：</span>

          <router-link
            v-if="item.form == 0"
            :to="{ path: 'card/' + item.toId }"
            >{{ item.title }}</router-link
          >
          <router-link
            v-if="item.form == 1"
            :to="{ path: '/article/detail/' + item.toId }"
            >{{ item.title }}</router-link
          >
        </div>
        <Divider />
        <div class="reply-content">
          <p>{{ item.replyContent }}</p>
        </div>

        <Icon
          v-if="item.isread == 0"
          class="unread-symbol"
          type="md-eye"
          color="red"
          size="20"
        ></Icon>
      </div>
    </Card>

    <Page
      :total="totalCount"
      class="pagin"
      show-elevator
      show-sizer
      show-total
      @on-change="
        e => {
          pageSearch(e);
        }
      "
    ></Page>
  </div>
</template>

<script>
export default {
  name: 'messages',

  data () {
    return {
      messages: [],
      pageSize: 10,
      page: 0,
      totalCount: 0
    }
  },

  mounted () {
    let _this = this
    this.axios
      .get(
        '/msgrecords/user?pageSize= ' + _this.pageSize + '&page=' + _this.page
      )
      .then(function (response) {
        let data = response.data.data
        _this.messages = data.data
        _this.totalCount = data.totalCount
      })
      .catch(() => {
        _this.$Message.error('查询失败，请稍后重试')
      })
  },

  methods: {
    read (id, isread) {
      if (isread === 1) {
        return
      }
      let _this = this
      this.axios({
        method: 'put',
        url: '/msgrecords/read/',
        params: {
          msgRecordId: id
        }
      })
        .then(
          function (response) {
            let index = _this.messages.findIndex(function (item) {
              return item.id === id
            })

            let item = _this.messages[index]
            item.isread = 1

            _this.messages.splice(index, 1, item)
          }
        )
        .catch(() => {
          _this.$Message.error('已读失败，请稍后重试')
        })
      // this.axios.put('/msgrecords/read/',{
      //     msgRecordId: id
      // }).then(function() {
      //     let index = _this.messages.findIndex(function(item) {
      //         return item.id == id;
      //     });

      //     let item = _this.messages[index];
      //     item.isread = 1;

      //     _this.messages.splice(index, 1, item);
      // }).catch(function (error) {
      //     _this.$Message.error('已读失败，请稍后重试');
      // });
    },
    pageSearch (e) {
      this.page = e - 1
      let _this = this
      this.axios
        .get(
          '/msgrecords/user?pageSize= ' + _this.pageSize + '&page=' + _this.page
        )
        .then(function (response) {
          let data = response.data.data
          _this.messages = data.data
          _this.totalCount = data.totalCount
        })
        .catch(() => {
          _this.$Message.error('查询失败，请稍后重试')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.unread-msg-wrapper {
  position: relative;
  width: 70%;
  min-width: 768px;
  margin: auto;
  padding: 20px 0;

  .msg-card-item {
    cursor: pointer;
  }

  .unread-symbol {
    position: absolute;
    top: 1.5em;
    right: 1em;
  }

  .synopsis {
    span {
      line-height: 30px;
      margin-right: 10px;
    }
  }

  .reply-content {
    padding: 6px 30px;

    p {
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
    }
  }

  .pagin {
    margin: 10px 20px;
  }
}
</style>
