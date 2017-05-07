<template>
  <div id="app">
    <mu-appbar title="3D云打印">
      <!-- <mu-icon-button icon="menu" slot="left"/> -->

      <mu-flat-button v-show="user"
          :label="user ? (`${user.nickname ? user.nickname : '请修改昵称'}(${user.username})`) : ''"
          slot="right"
          ref="button"
          @click="toggle"/>
      <mu-flat-button v-if="!user"
        label="login"
        to="/login"
        slot="right"/>
      <mu-popover
        :trigger="trigger" :open="open"
        @close="handleClose"
        :anchorOrigin="{vertical:'bottom',horizontal:'right'}"
        :targetOrigin="{vertical:'top',horizontal:'right'}">
        <mu-menu>
          <mu-menu-item v-if="user ? (user.nickname?false:true) : false" title="修改昵称" />
          <mu-menu-item title="Log Out" @click="logoutClicked"/>
        </mu-menu>
      </mu-popover>
      <mu-flat-button to="/" label="首页" slot="left"/>
      <mu-flat-button to="/print" label="打印" slot="left"/>
      <mu-flat-button to="/check" label="查看" slot="left"/>
      <!-- <mu-flat-button href="333" label="expand_more" slot="right"/> -->
      <!-- <mu-icon-button icon="expand_more" slot="right"/> -->
    </mu-appbar>
    <transition name="fade">
      <router-view class="wrap"></router-view>
    </transition>
  </div>
</template>

<script>
import store from './store'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  store,
  data () {
    return {
      open: false,
      trigger: null
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    console.log(this.$refs)
    this.trigger = this.$refs.button.$el
  },
  methods: {
    ...mapActions(['logout']),
    toggle () {
      this.open = !this.open
    },
    handleClose (e) {
      this.open = false
    },
    logoutClicked () {
      this.handleClose()
      this.logout()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  display: flex;
  flex-direction: column;
}

* {
  margin: 0; padding: 0;
}

a,a:hover{
  text-decoration:none;
  color:#333;
}

.wrap {
  position: absolute;
  width: 100%;
  top: 72px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
