<template>
  <el-container>
    <el-aside style="width: 40%">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="hash"
          label="HASH"
          width="200">
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL"
          width="200">
          <template slot-scope="scope">
            <a :href=scope.row.url
              target="_black"
              class="buttonText">{{scope.row.url}}</a>
          </template>
        </el-table-column>
      </el-table>
    </el-aside>
    <el-main style="width: 60%">
      <div>
        <span style="font-size: 16px;">HASH: </span>
      </div>
      <div>
        <span style="font-size: 16px;">URL: </span>
      </div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea2">
      </el-input>
      <el-button type="primary" style="margin: 5px 0;">save</el-button>
    </el-main>
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
        hash: '03595e7b91dac6e143cfcf9dc26f30bf',
        url: 'http://dlvr.it/R5Ml99',
        edit: 0
      }, {
        hash: '6a665e01210c0d9f70bd9648dcfa6007',
        url: 'https://gcn.com/articles/2019/01/09/cyber-visibility-challenges.aspx?m=1',
        edit: 1
      }],
      textarea2: ''
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
