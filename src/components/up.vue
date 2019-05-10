<template>
<!-- 回到顶部 -->
  <!--<div v-if="scroll" @click="up" class="up">
    <i class="el-icon-arrow-up"></i>
  </div>-->
  <div v-if="scroll" @click="goTop" ref="btn" class="up">
    <i class="el-icon-arrow-up"></i>
  </div>
</template>
<script>
export default {
  // ..
  /* data () {
    return {
      y: ''
    }
  },
  computed: {
    scroll () {
      if (this.y > 200) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    up () {
      window.scrollTo(0, 0)
    },
    dis () {
      let hign = window.scrollY
      // console.log(hign)
      this.y = hign
      // console.log('this.y', this.y)
      // console.log(this.scroll)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.dis)
  } */
  data () {
    return {
      isTop: true,
      timer: null,
      y: ''
    }
  },
  computed: {
    scroll () {
      if (this.y > 200) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.dis)
  },
  methods: {
    dis () {
      let hign = window.scrollY
      // console.log(hign)
      this.y = hign
      // console.log('this.y', this.y)
      // console.log(this.scroll)
    },
    goTop () {
      let self = this
      self.timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        let ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        self.isTop = true
        if (osTop === 0) {
          clearInterval(self.timer)
        }
      }, 30)
    }
  }
}
</script>
<style lang="less" scoped>
  .up {
    width: 30px;
    height: 30px;
    position: fixed;
    right: 30px;
    bottom: 150px;
    background: rgba(188, 194, 193, .4);
    cursor: pointer;
    z-index: 1000;
    i {
      line-height: 30px;
    }
  }
</style>
