<template>
  <div class="check">
    <mu-paper :style="{width:'1000px',margin:'0 auto'}">
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
          <mu-tr v-for="item in checkList" :key="item.id">
            <mu-td>{{item.id}}</mu-td>
            <mu-td>{{item.title}}</mu-td>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkList: [{
        id: 100001,
        title: '第一个3d打印模型',
        state: '审核中'
      }, {
        id: 100002,
        title: '埃菲尔铁塔模型',
        state: '打印中'
      }, {
        id: 100003,
        title: '手机壳3d模型',
        state: '审核中'
      }, {
        id: 100004,
        title: '传动装置-轴',
        state: '已完成'
      }, {
        id: 100005,
        title: '第三次作业模型设计',
        state: '已完成'
      }, {
        id: 100006,
        title: '手枪模型打印文件',
        state: '已完成'
      }, {
        id: 100007,
        title: '徽章-金刚狼',
        state: '已完成'
      }],
      total: 50,
      current: 1
    }
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
