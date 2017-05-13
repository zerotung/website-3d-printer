<template>
  <div class="check">
    <mu-popup position="right" popupClass="edit-task" :open="editTaskController" @close="closeEditTaskArea">
      <mu-text-field v-model="fillingRate" label="填充率" hintText="百分比" type="number" fullWidth/><br/>
      <mu-text-field v-model="storyHeight" label="层高" hintText="单位：毫米" type="number" fullWidth/><br/>
      <mu-select-field v-model="structure" :labelFocusClass="['label-foucs']" label="填充结构" fullWidth>
        <mu-menu-item v-for="text,index in list" :key="index" :value="index" :title="text" />
      </mu-select-field>
      <mu-raised-button label="确认修改" @click="confirmEditTask" primary fullWidth/>
      <mu-raised-button label="取消" @click="closeEditTaskArea" fullWidth/>
    </mu-popup>
    <mu-paper v-if="user" :style="{width:'1000px',margin:'20px auto'}">
      <h1>您当前的订单如下</h1>
      <mu-table>
        <mu-thead>
          <mu-tr>
            <mu-th>订单号</mu-th>
            <mu-th>标题</mu-th>
            <mu-th>状态</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item in allTasks" :key="item.id">
            <mu-td>{{item.id}}</mu-td>
            <mu-td>{{item.title}}</mu-td>
            <mu-td>{{item.state}}</mu-td>
            <mu-td>
              <mu-icon-button icon="settings" @click="openEditTask(item.id)"/>
              <mu-icon-button icon="file_download"/>
              <mu-icon-button icon="cancel"/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-pagination :total="total" :current="current" @pageChange="handleClick">
      </mu-pagination>
    </mu-paper>
    <mu-paper v-else :style="{width:'1000px',margin:'20px auto'}">
      <h1>请先登录</h1>
    </mu-paper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from '../router/index.js'

export default {
  data () {
    return {
      total: 50,
      current: 1,
      editTaskController: false,
      fillingRate: '',
      storyHeight: '',
      structure: 0,
      list: ['直线形', '对角线', '六角形', 'Catfill', 'Moroccan stars形']
    }
  },
  computed: {
    ...mapGetters(['allTasks', 'user', 'selectedTask']),
    inputTask () {
      return {
        fillingRate: this.fillingRate,
        storyHeight: this.storyHeight,
        structure: this.list[this.structure]
      }
    }
  },
  methods: {
    ...mapActions(['selectTask', 'fillingTask', 'applyForPrint', 'editTask', 'fetchTask', 'cleanTask']),
    closeEditTaskArea () {
      this.editTaskController = false
    },
    openEditTask (id) {
      this.editTaskController = true
      this.selectTask(id).then(() => {
        this.fillingRate = this.selectedTask.task.fillingRate
        this.storyHeight = this.selectedTask.task.storyHeight
        for (var index in this.list) {
          if (this.list[index] === this.selectedTask.task.structure) {
            this.structure = index - 0
            break
          }
        }
      })
    },
    confirmEditTask () {
      if (this.user) {
        this.editTask().then(() => {
          alert('修改成功')
          this.fetchTask('username', this.user.username)
          this.cleanTask()
          this.closeEditTaskArea()
        })
      } else {
        router.push({
          name: 'Login'
        })
      }
    },
    handleClick (newIndex) {
    }
  },
  watch: {
    inputTask (val) {
      this.fillingTask(val)
    }
  },
  mounted () {
    this.fetchTask({
      type: 'username',
      val: this.user.username
    })
  }
}
</script>

<style lang="scss">
.edit-task {
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 375px;
  align-items: center;
  padding: 24px;
  flex-direction: column;
  justify-content: center;

  form {
    width: 100%;
  }
}
.check{
  .mu-table {
    table-layout: auto;
  }
  .mu-pagination {
    margin-top: 20px;
    justify-content: center;
  }
}
</style>
