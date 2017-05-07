import axios from 'axios'

// initial state
const state = {
  user: null,
  state: 'logout',
  info: ''
}

// getters
const getters = {
  user: state => state.user,
  loginState: state => state.state,
  info: state => state.info
}

// actions
const actions = {
  login ({ commit }, {
    username,
    password
  }) {
    axios.get('/users', {
      params: {
        username: username,
        password: password
      }
    })
    .then(function (response) {
      console.log(response.data)
      if (response.data.status === 1) {
        commit('changeUser', response.data.data)
        commit('loginSuccess', '登录成功')
      } else {
        commit('loginFailed', '用户名或密码错误')
      }
    })
    .catch(function (response) {
      alert('注册失败，请检查您的网络')
    })
  },
  signin ({ commit }, {
    username,
    password
  }) {
    axios.post('/users', {
      username: username,
      password: password
    })
    .then(function (response) {
      console.log(response.data)
      if (response.data.status === 1) {
        commit('changeUser', response.data.data)
        commit('signinSuccess', '注册成功')
      } else {
        commit('signinError', '用户名已存在')
      }
    })
    .catch(function (response) {
      alert('注册失败，请检查您的网络')
    })
  },
  logout ({ commit }) {
    commit('clearUser')
  },
  changePassword ({ commit }, {
    username,
    password,
    newPassword
  }) {
    axios.post('/users/password', {
      username: username,
      password: password,
      newPassword: newPassword
    })
    .then(function (response) {
      if (response.data.status === 1) {
        alert('修改成功')
      } else {
        alert(response.data.info)
      }
    })
    .catch(function (response) {
      alert('注册失败，请检查您的网络')
    })
  },
  changeNickname ({ commit }, {
    username,
    newNickname
  }) {
    axios.post('/users/nickname', {
      username: username,
      newNickname: newNickname
    })
    .then(function (response) {
      if (response.data.status === 1) {
        let newUser = {
          username: state.user.username,
          nickname: response.data.data.nickname
        }
        commit('changeUser', newUser)
        alert('修改成功')
      } else {
        alert(response.data.info)
      }
    })
    .catch(function (response) {
      alert('注册失败，请检查您的网络')
    })
  }
}

// mutations
const mutations = {
  changeUser (state, userInfo) {
    state.user = userInfo
  },
  logout (state, info) {
    state.info = info
    state.state = 'logout'
  },
  loginSuccess (state, info) {
    state.info = info
    state.state = 'loginSuccess'
  },
  loginFailed (state, info) {
    state.info = info
    state.state = 'loginError'
  },
  signinSuccess (state, info) {
    state.info = info
    state.state = 'SigninSuccess'
  },
  signinError (state, info) {
    state.info = info
    state.state = 'SigninError'
  },
  clearUser (state) {
    state.user = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
