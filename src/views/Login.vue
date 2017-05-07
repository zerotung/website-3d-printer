<template>
  <div class="login">
    <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
      {{info}}
    </mu-popup>
    <mu-paper class="login-paper">
      <h1>登录</h1>
      <mu-text-field v-model="username" hintText="账户" icon="person" fullWidth/><br/>
      <mu-text-field v-model="password" hintText="密码" type="password" icon="lock" fullWidth/><br/>
      <mu-raised-button class="btn" label="登录" @click="loginClicked" primary fullWidth/>
      <mu-raised-button class="btn" label="注册" @click="signinClicked" fullWidth/>
    </mu-paper>
  </div>
</template>

<script>
// import axios from 'axios'
import router from '../router/index.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      topPopup: false
    }
  },
  computed: {
    ...mapGetters(['user', 'loginState', 'info'])
  },
  methods: {
    ...mapActions(['login', 'signin', 'fetchTask']),
    loginClicked () {
      this.login({
        username: this.username,
        password: this.password
      }).then(() => {
        this.topPopup = true
      })
    },
    signinClicked () {
      this.signin({
        username: this.username,
        password: this.password
      }).then(() => {
        this.topPopup = true
      })
    }
  },
  watch: {
    loginState () {
      if (this.loginState === 'loginSuccess') {
        this.fetchTask({
          type: 'username',
          val: this.user.username
        }).then(() => {
          router.push({name: 'Index'})
        })
      }
    },
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss">
.login-paper {
  width: 700px;
  margin: 150px auto;
  .btn {
    margin: 7px 0;
  }
  .demo-popup-top {
    width: 100%;
    opacity: .8;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
  }
}
</style>
