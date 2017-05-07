<template>
  <div class="check">
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
            <mu-td>{{item.task.title}}</mu-td>
            <mu-td>{{item.state}}</mu-td>
            <mu-td>
              <mu-icon-button icon="settings"/>
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      total: 50,
      current: 1
    }
  },
  computed: {
    ...mapGetters(['allTasks', 'user'])
  },
  methods: {
    handleClick (newIndex) {
    }
  }
}
</script>

<style lang="scss">
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
