<template>
  <el-container>
    <el-aside style="width: 30%">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @cell-click="onCellClick">
        <el-table-column
          prop="hash"
          label="HASH"
          :filters="[{text: 'edited', value: true}, {text: 'unedited', value: false}, {text: 'use', value: true}, {text: 'useless', value: false}]"
          :filter-method="filterEdit">
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL"
          :filters="[{text: 'use', value: true}, {text: 'useless', value: false}]"
          :filter-method="filterUse">
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
          layout="total, prev, pager, next, jumper"
          :total="pages_total"
          :pager-count="5"
          small>
        </el-pagination>
      </div>
    </el-aside>

    <el-main style="width: 70%;padding-top: 0;padding-bottom: 0;">
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
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="正文">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 15}"
            placeholder="请输入内容"
            v-model="form.text"
            style="margin: 5px 0;">
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: left;">
          <el-radio v-model="form.relevant" label="relevant" name="type"></el-radio>
          <el-radio v-model="form.relevant" label="irrelevant" name="type"></el-radio>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">save</el-button>
        <el-button @click="delect">删除</el-button>
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
      if (row['use'] === false) {
        return 'info-row'
      }
      else if (row['has_edit']) {
        return 'success-row';
      } else {
        return 'warning-row';
      }
      return '';
    },
    onCellClick(row, column, cell, event) {  // 加载右侧待编辑数据
      this.formData[0]['value'] = row['hash']
      this.formData[1]['value'] = row['url']
      this.form.title = row['title']
      this.form.text = row['text']
      this.form.relevant = row['relevant']
      this.form.hash = row['hash']
    },
    filterEdit(value, row) {
      return row.has_edit === value
    },
    filterUse(value, row) {
      return row.use === value
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
        this.form = {
          hash: '',
          text: '',
          relevant: 'relevant'
        }
        this.formData[0]['value'] = ''
        this.formData[1]['value'] = ''
        this.getPages()
      })
      .catch(err => {
        this.toastr.error(`${err.message}`, 'ERROR!')
        console.log(err)
      })
    },
    delect() {
      this.$http.post('/api/delect_pages', {
        hash: this.form.hash
      })
      .then(res => {
        this.toastr.success('操作成功')
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
        title: '',
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
.el-table .warning-row {
  background: #fff;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-table .info-row {
  background: #f2f6fc;
}
</style>
