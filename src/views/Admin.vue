<template>
<div>
  <div v-if="user" class="admin-wrap">
    <mu-dialog :open="dialog" title="审核任务" @close="close">
      {{taskPicked.title}}
      <mu-list>
        <mu-list-item>填充率：{{taskPicked.task.fillingRate}}%</mu-list-item>
        <mu-list-item>层高：{{taskPicked.task.storyHeight}}mm</mu-list-item>
        <mu-list-item>填充结构：{{taskPicked.task.structure}}</mu-list-item>
      </mu-list>
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="confirmCheck" label="审核通过"/>
    </mu-dialog>
    <mu-dialog :open="dialogPrint" title="打印任务" @close="closePrint">
      {{taskPicked.title}}
      <mu-list>
        <mu-list-item>填充率：{{taskPicked.task.fillingRate}}%</mu-list-item>
        <mu-list-item>层高：{{taskPicked.task.storyHeight}}mm</mu-list-item>
        <mu-list-item>填充结构：{{taskPicked.task.structure}}</mu-list-item>
      </mu-list>
      <mu-flat-button slot="actions" @click="closePrint" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="confirmPrint" label="确定打印"/>
    </mu-dialog>
    <mu-popup position="right" popupClass="demo-popup-right" :open="rightPopup" @close="closePopRight()">
        <h1>发消息给：{{userPicked.name}}</h1>
        <mu-text-field v-model="sendMsgText" hintText="请输入要发送的消息" multiLine :rows="3" :rowsMax="6"/><br/>
        <div style="display: flex">
          <mu-raised-button class="popupBtn" label="确认发送" @click="sendMsg" primary/>
          <mu-raised-button class="popupBtn" label="取消发送" @click="closePopRight()"/>
        </div>
      </mu-popup>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="任务管理"/>
      <mu-tab value="tab2" title="用户管理"/>
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <mu-paper>
      <mu-flexbox>
        <mu-flexbox-item class="flex-demo">
          <mu-list>
            <mu-sub-header>待审核的任务</mu-sub-header>
            <mu-list-item v-if="item.state === 'unchecked'" v-for="item in allTasks" :key="item.title + 'waiting'" :title="item.title" @click="open(item.id)">
              <mu-icon slot="right" value="arrow_right"/>
            </mu-list-item>
          </mu-list>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <mu-sub-header>任务队列</mu-sub-header>
          <mu-list>
            <mu-list-item v-if="item.state === 'checked'" v-for="item in allTasks" :key="item.title + 'queue'" :title="item.title" @click="openPrint(item.id)">
              <mu-icon slot="right" value="print"/>
            </mu-list-item>
          </mu-list>
        </mu-flexbox-item>
      </mu-flexbox>
      </mu-paper>
    </div>
    <div v-if="activeTab === 'tab2'">
      <mu-paper>
        <mu-text-field label="输入ID或名字查询用户" icon="search" labelFloat fullWidth/><br/>
        <mu-table>
          <mu-thead>
            <mu-tr>
              <mu-th>ID</mu-th>
              <mu-th>姓名</mu-th>
              <mu-th>权限</mu-th>
              <mu-th>发布</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="user in userList" :key="user.username">
              <mu-td>{{user.username}}</mu-td>
              <mu-td>{{user.nickname}}</mu-td>
              <mu-td>
                {{user.username == 'admin' ? '管理员' : '普通用户'}}
                <mu-flat-button label="编辑" labelPosition="before" icon="edit"/>
              </mu-td>
              <mu-td>
                <mu-flat-button @click="openPopup" label="发送消息" labelPosition="before" icon="arrow_forward"/>
              </mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
        <mu-pagination class="pagination-area" :total="total" :current="current" @pageChange="handleClick">
        </mu-pagination>
      </mu-paper>
    </div>
  </div>
  <mu-paper v-else :style="{width:'1000px',margin:'20px auto'}">
    <h1>请先登录</h1>
  </mu-paper>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      activeTab: 'tab1',
      rightPopup: false,
      total: 500,
      current: 1,
      dialog: false,
      dialogPrint: false,
      sendMsgText: '',
      taskPicked: {
        id: '',
        title: '',
        task: {
          fillingRate: '',
          storyHeight: '',
          structure: ''
        }
      },
      userPicked: {
        id: 1,
        name: 'John Smith',
        permission: '0'
      },
      userList: []
    }
  },
  computed: {
    ...mapGetters(['user', 'allTasks'])
  },
  methods: {
    ...mapActions(['editTask']),
    handleTabChange (val) {
      this.activeTab = val
    },
    handleActive () {
      window.alert('tab active')
    },
    handleClick (newIndex) {
    },
    open (id) {
      let obj = this.allTasks.find(p => p.id === id)
      this.taskPicked = obj
      this.dialog = true
    },
    openPrint (id) {
      let obj = this.allTasks.find(p => p.id === id)
      this.taskPicked = obj
      this.dialogPrint = true
    },
    openPopup (userId) {
      console.log(userId)
      for (var user in this.user) {
        if (user.id === userId) {
          this.userPicked = user
        }
      }
      this['rightPopup'] = true
    },
    sendMsg () {
      if (!this.sendMsgText) {
        alert('请输入要发送的消息')
      } else {
        this['rightPopup'] = false
      }
    },
    close () {
      this.dialog = false
    },
    closePrint () {
      this.dialogPrint = false
    },
    closePopRight () {
      this.rightPopup = false
    },
    confirmCheck () {
      this.taskPicked.state = 'checked'
      this.editTask(this.taskPicked)
      this.close()
    },
    confirmPrint () {
      this.taskPicked.state = 'printed'
      this.editTask(this.taskPicked)
      this.closePrint()
    },
    fetchUserList () {
      axios.get('/users/list', {})
      .then((response) => {
        if (response.data.status === 1) {
          this.userList = response.data.data
          // console.log(this.userList)
        }
      })
      .catch(function (response) {
        console.log('获取用户列表失败')
      })
    }
  },
  mounted () {
    this.fetchUserList()
  }
}
</script>

<style lang="scss">
.admin-wrap {
  max-width: 1000px;
  margin: 30px auto;
  .mu-tabs {
    background-color: #fff;
    color: #333;
  }
  .mu-tab-active {
    color: #7e57c2;
  }
  .mu-tab-link {
    color: #333;
  }
  .mu-table {
    table-layout: auto;
  }
  .pagination-area {
    margin-top: 20px;
    justify-content: center;
  }
}
.demo-popup-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 375px;
  align-items: center;
  padding: 24px;

  .popupBtn {
    margin: 0 5px;
  }
}
</style>
