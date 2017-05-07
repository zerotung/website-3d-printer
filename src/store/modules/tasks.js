import axios from 'axios'

// initial state
// shape: [{ id, quantity }]
const state = {
  all: [],
  selectedTask: {},
  filledTask: {}
}

// getters
const getters = {
  selectedTask: state => state.selectedTask,
  allTasks: state => state.all,
  filledTask: state => state.filledTask
}

// actions
const actions = {
  // 正在填写表单
  fillingTask ({commit}, task) {
    commit('filledTaskChange', task)
  },
  // 申请打印
  applyForPrint ({commit}, username) {
    axios.post('/tasks', {
      username: username,
      task: state.filledTask
    })
    .then(function (response) {
      console.log(response.data)
      if (response.data.status === 1) {
        commit('addTask', response.data.data)
      }
    })
    .catch(function (response) {
      alert('注册失败，请检查您的网络')
    })
  },
  fetchTask ({ commit }, {
    type,
    val
  }) {
    axios.get('/tasks', {
      params: {
        type: type,
        val: val
      }
    })
    .then(function (response) {
      if (response.data.status === 1) {
        commit('initTask', response.data.data)
      }
    })
    .catch(function (response) {
      alert('注册失败，请检查您的网络')
    })
  }
}

// mutations
const mutations = {
  filledTaskChange (state, task) {
    state.filledTask = task
  },
  editTask (state, {
    id
  }) {
    state.lastCheckout = null
    // const record = state.all.find(p => p.id === id)
    // if (!record) {
    //   state.added.push({
    //     id,
    //     quantity: 1
    //   })
    // } else {
    //   record.quantity++
    // }
  },

  selectTask (state, {
    taskId
  }) {
    const record = state.all.find(p => p.id === taskId)
    state.selectTask = record
  },
  initTask (state, tasks) {
    state.all = tasks
  },
  addTask (state, task) {
    state.all.push(task)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
