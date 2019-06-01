<template>
  <el-container>
    <el-aside>
          <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
      <!-- <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="hash"
          label="HASH"
          width="50%">
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL"
          width="50%">
          <template slot-scope="scope">
            <a :href=scope.row.url
              target="_black"
              class="buttonText">{{scope.row.url}}</a>
          </template>
        </el-table-column>
      </el-table> -->
    </el-aside>
    <el-main></el-main>
  </el-container>
</template>

<script>
export default {
  name: 'textclassfication',
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (row['edit'] == 0) {
        return 'warning-row';
      } else if (row['edit'] == 1) {
        return 'success-row';
      }
      return '';
    }
  },
  data() {
    return {
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      // tableData: [{
      //   hash: '03595e7b91dac6e143cfcf9dc26f30bf',
      //   url: 'http://dlvr.it/R5Ml99',
      //   edit: 0
      // }, {
      //   hash: '6a665e01210c0d9f70bd9648dcfa6007',
      //   url: 'https://gcn.com/articles/2019/01/09/cyber-visibility-challenges.aspx?m=1',
      //   edit: 1
      // }]
    }
  }
}
</script>

<style>
.el-table {
  width: 100%!important;
}
.el-table .warning-row {
  background: #fff;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
