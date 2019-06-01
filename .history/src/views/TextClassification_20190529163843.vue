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
          <el-radio v-model="form.relevant" label="relevant" name="type"></el-radio>
          <el-radio v-model="form.relevant" label="irrelevant" name="type"></el-radio>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">save</el-button>
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
    onCellClick(row, column, cell, event) {  // 加载右侧待编辑数据
      this.formData[0]['value'] = row['hash']
      this.formData[1]['value'] = row['url']
      this.form.text = row['text']
      this.form.relevant = row['relevant']
      this.form.hash = row['hash']
    },
    filterTag(value, row) {
      return row.has_edit === value
    },
    getPages () {
      this.$http.post('/api/pages', {
        current: this.currentPage,
        pagesize: this.pagesize
      })
      .then(res => {
        console.log(res.data)
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
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getPages()
    },
    onSubmit() {
      // 提交数据
      this.$http.post('/api/edit_pages', {
        form: this.form
      })
      .then(r => {
        this.toastr.success('提交成功')
        this.getPages()
      })
      .catch(err => {
        this.toastr.error(`${err.message}`, 'ERROR!')
        console.log(err)
      })
    }
  },
  data() {
    return {
      tableData: [],
      formData: [{
        label: 'HASH',
        value: ''
      },{
        label: 'URL',
        value: ''
      }],
      form: {
        hash: '',
        text: '',
        relevant: 'relevant'
      },
      currentPage: 1,
      pagesize: 10,
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
