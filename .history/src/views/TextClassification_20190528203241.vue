<template>
  <el-container>
    <el-aside style="width: 40%">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @cell-click="onCellClick">
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

    <el-main style="width: 60%;padding-top: 0;padding-bottom: 0;">
      <el-table
        :data="formData"
        :show-header="false"
        style="width: 100%">
        <el-table-column
          prop="label"
          label="label"
          width="80"></el-table-column>
        <el-table-column
          prop="value"
          label="value"></el-table-column>
      </el-table>
      <el-form ref="form" :model="form">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="form.text"
          style="margin: 5px 0;">
        </el-input>
        <el-form-item>
          <el-checkbox label="relevant" name="type"></el-checkbox>
          <el-checkbox label="irrelevant" name="type"></el-checkbox>
        </el-form-item>
        <el-button type="primary">save</el-button>
      </el-form>
    </el-main>

  </el-container>
</template>

<script>
export default {
  name: 'textclassfication',
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (row['has_edit']) {
        return 'success-row';
      } else {
        return 'warning-row';
      }
      return '';
    },
    onCellClick(row, column, cell, event) {
      this.formData[0]['value'] = row['hash']
      this.formData[1]['value'] = row['url']
    }
  },
  data() {
    return {
      tableData: [{
        hash: '03595e7b91dac6e143cfcf9dc26f30bf',
        url: 'http://dlvr.it/R5Ml99',
        has_edit: false
      }, {
        hash: '6a665e01210c0d9f70bd9648dcfa6007',
        url: 'https://gcn.com/articles/2019/01/09/cyber-visibility-challenges.aspx?m=1',
        has_edit: true
      }],
      formData: [{
        label: 'HASH',
        value: '03595e7b91dac6e143cfcf9dc26f30bf'
      },{
        label: 'URL',
        value: 'http://dlvr.it/R5Ml99'
      }],
      form: {
        text: ''
      }
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
