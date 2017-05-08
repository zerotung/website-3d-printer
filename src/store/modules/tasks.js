import axios from 'axios'

// initial state
// shape: [{ id, quantity }]
const state = {
  all: [],
  selectedTask: {},
  filledTask: {},
  uploadFileInfo: {}
}

// getters
const getters = {
  selectedTask: state => state.selectedTask,
  allTasks: state => state.all,
  filledTask: state => state.filledTask,
  uploadFileInfo: state => state.uploadFileInfo
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
      id: state.uploadFileInfo.id,
      title: state.uploadFileInfo.title,
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
  },
  fileUploaded ({commit}, {
    title,
    id
  }) {
    commit('uploadFileChange', {title, id})
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
  },
  uploadFileChange (state, fileInfo) {
    state.uploadFileInfo = fileInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
