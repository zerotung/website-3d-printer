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
      console.log('注册失败，请检查您的网络')
    })
  },
  fileUploaded ({commit}, {
    title,
    id
  }) {
    commit('uploadFileChange', {title, id})
  },
  selectTask ({commit}, id) {
    commit('selectNewTask', id)
  },
  editTask ({commit}, task) {
    if (!task) {
      axios.post('/tasks/edit', {
        id: state.selectedTask.id,
        task: state.filledTask
      })
      .then(function (response) {
        if (response.data.status === 1) {
          commit('editAllTask')
        }
      })
      .catch(function (response) {
        console.log('注册失败，请检查您的网络')
      })
    } else {
      axios.post('/tasks/edit', {
        id: task.id,
        task: task
      })
      .then(function (response) {
        if (response.data.status === 1) {
          commit('editAllTask')
        }
      })
      .catch(function (response) {
        console.log('注册失败，请检查您的网络')
      })
    }
  },
  cleanTask ({commit}) {
    commit('cleanTask')
  }
}

// mutations
const mutations = {
  filledTaskChange (state, task) {
    state.filledTask = task
  },
  selectNewTask (state, taskId) {
    console.log(taskId)
    const record = state.all.find(p => p.id === taskId)
    state.selectedTask = record
  },
  initTask (state, tasks) {
    state.all = tasks
  },
  addTask (state, task) {
    state.all.push(task)
  },
  uploadFileChange (state, fileInfo) {
    state.uploadFileInfo = fileInfo
  },
  editAllTask (state) {
    var findTask = state.all.find(p => p.id === state.selectedTask.id)
    findTask.task = state.fillingTask
    this.cleanTask
  },
  cleanTask (state) {
    state.selectedTask = {}
    state.filledTask = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
