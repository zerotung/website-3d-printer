<template>
<div>
  <div class="admin-wrap">
    <mu-dialog :open="dialog" title="审核任务" @close="close">
      {{waitingPicked.title}}
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="close" label="确定"/>
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
            <mu-list-item v-for="item in waiting" :key="item.title + 'waiting'" :title="item.title" @click="open(item.title)">
              <mu-icon slot="right" value="arrow_right"/>
            </mu-list-item>
          </mu-list>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <mu-sub-header>任务队列</mu-sub-header>
          <mu-list>
            <mu-list-item v-for="item in queue" :key="item.title + 'queue'" :title="item.title">
              <mu-icon slot="right" value="menu"/>
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
            <mu-tr v-for="user in userData" :key="user.id">
              <mu-td>{{user.id}}</mu-td>
              <mu-td>{{user.name}}</mu-td>
              <mu-td>
                {{user.permission == 0 ? '普通用户' : '管理员'}}
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
</div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 'tab1',
      rightPopup: false,
      total: 500,
      current: 1,
      dialog: false,
      sendMsgText: '',
      waitingPicked: {
        id: 1,
        name: 'John Smith',
        permission: '0'
      },
      userPicked: {
        id: 1,
        name: 'John Smith',
        permission: '0'
      },
      userData: [{
        id: 1,
        name: 'John Smith',
        permission: '0'
      }, {
        id: 2,
        name: 'Randal White',
        permission: '0'
      }, {
        id: 3,
        name: 'Stephanie Sanders',
        permission: '1'
      }, {
        id: 4,
        name: 'Steve Brown',
        permission: '0'
      }, {
        id: 5,
        name: 'Stephanie Sanders',
        permission: '1'
      }, {
        id: 6,
        name: 'Steve Brown',
        permission: '0'
      }],
      waiting: [{
        title: 'abcdefg1',
        fillingRate: '20',
        storyHeight: '30',
        structure: '3'
      }, {
        title: 'abcdefg2',
        fillingRate: '20',
        storyHeight: '30',
        structure: '3'
      }, {
        title: 'abcdefg3',
        fillingRate: '20',
        storyHeight: '30',
        structure: '3'
      }, {
        title: 'abcdefg4',
        fillingRate: '20',
        storyHeight: '30',
        structure: '3'
      }],
      queue: [{
        title: 'abcdefg5',
        fillingRate: '20',
        storyHeight: '30',
        structure: '3'
      }, {
        title: 'abcdefg6',
        fillingRate: '20',
        storyHeight: '30',
        structure: '3'
      }, {
        title: 'abcdefg7',
        fillingRate: '20',
        storyHeight: '30',
        structure: '3'
      }, {
        title: 'abcdefg8',
        fillingRate: '20',
        storyHeight: '30',
        structure: '3'
      }]
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    handleActive () {
      window.alert('tab active')
    },
    handleClick (newIndex) {
    },
    open (title) {
      for (var waitingTask in this.waiting) {
        if (waitingTask.title === title) {
          this.waitingPicked = waitingTask
        }
      }
      this.dialog = true
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
    closePopRight () {
      this.rightPopup = false
    }
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
