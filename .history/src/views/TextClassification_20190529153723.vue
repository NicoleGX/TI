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
          width="200"
          :filters="[{text: 'edited', value: true}, {text: 'unedited', value: false}]"
          :filter-method="filterTag">
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
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="pages_total"
          :pager-count="5"
          small>
        </el-pagination>
      </div>
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
          :autosize="{ minRows: 5, maxRows: 15}"
          placeholder="请输入内容"
          v-model="form.text"
          style="margin: 5px 0;">
        </el-input>
        <el-form-item style="text-align: left;">
          <el-radio v-model="form.radio" label="relevant" name="type"></el-radio>
          <el-radio v-model="form.radio" label="irrelevant" name="type"></el-radio>
        </el-form-item>
        <el-button type="primary">save</el-button>
      </el-form>
    </el-main>

  </el-container>
</template>

<script>
export default {
  name: 'textclassfication',
  created () {
    // get pages document and count
    this.getPages()
  },
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
    },
    filterTag(value, row) {
      return row.has_edit === value
    },
    getPages () {
      console.log('getPages')
      this.$http.post('/api/pages', {
        current: this.currentPage,
        pagesize: this.pagesize
      })
      .then(res => {
        this.pages_total = res.data['count']
        this.tableData = res.data['doc']
      })
      .catch(err => {
        this.toastr.error(`${err.message}`, 'ERROR!')
        console.log(err)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = val
      this.getPages()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
        text: '',
        radio: 'relevant'
      },
      currentPage: 1,
      pagesize: 20,
      pages_total: 0
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
