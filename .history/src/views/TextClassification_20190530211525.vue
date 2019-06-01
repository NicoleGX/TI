<template>
  <el-container>
    <el-aside style="width: 30%">
      <!-- 左侧的hash-url列表 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @cell-click="onCellClick">
        <el-table-column
          prop="hash"
          label="HASH"
          :filters="[{text: 'edited', value: true}, {text: 'unedited', value: false}]"
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
      <!-- 分页 -->
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
          <el-input v-model="form.title" @input="title_change"></el-input>
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
          <el-radio v-model="form.relevant" label="none" name="type"></el-radio>
          <el-radio v-model="form.relevant" label="irrelevant" name="type"></el-radio>
        </el-form-item>
        <el-form-item style="text-align: left;">
          <el-tag
            :key="tag"
            v-for="tag in form.dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-button type="primary" v-if="has_edit" disabled>save</el-button>
        <el-button type="primary" @click="onSubmit" v-else>save</el-button>
        <el-button v-if="has_edit" disabled>删除</el-button>
        <el-button @click="delect" v-else>删除</el-button>
        <el-button type="danger" @click="edit" v-if="has_edit">编辑</el-button>
        <el-button type="danger" v-else disabled>编辑</el-button>
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
      // console.log(row)
      this.formData[0]['value'] = row['hash']
      this.formData[1]['value'] = row['url']
      this.form.title = row['title']
      this.form.text = row['text']
      this.form.relevant = row['relevant']
      this.form.hash = row['hash']
      this.form.dynamicTags = row['tags']
      this.has_edit = row['has_edit']
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
        // console.log(res.data)
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
      this.clearnForm()
    },
    clearnForm() {
      this.formData[0]['value'] = ''
      this.formData[1]['value'] = ''
      this.form = {
        hash: '',
        title: '',
        text: '',
        relevant: 'relevant',
        dynamicTags: []
      }
    },
    title_change() {
      if (this.form.title) {
        // 查询该标题是否已存在
        this.$http.post('/api/title_exists', {
          title: this.form.title
        })
        .then(r => {
          if (r.data.doc) {
            this.toastr.success('数据已存在')
            this.form.text = r.data.doc['text']
            this.form.relevant = r.data.doc['relevant']
          }
        })
      }
    },
    edit() {
      this.has_edit = false
    },
    onSubmit() {
      if (this.form.hash) {
        // 提交数据
        this.$http.post('/api/edit_pages', {
          form: this.form
        })
        .then(r => {
          this.toastr.success('提交成功')
          this.clearnForm()
          this.getPages()
        })
        .catch(err => {
          this.toastr.error(`${err.message}`, 'ERROR!')
          console.log(err)
        })
      }
      else {
        this.toastr.warning('请选择数据')
      }
    },
    delect() {
      if (this.form.hash) {
        this.$http.post('/api/delect_pages', {
          hash: this.form.hash
        })
        .then(res => {
          this.toastr.success('操作成功')
          this.clearnForm()
          this.getPages()
        })
        .catch(err => {
          this.toastr.error(`${err.message}`, 'ERROR!')
          console.log(err)
        })
      }
      else {
        this.toastr.warning('请选择数据')
      }
    },
    handleClose(tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
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
        relevant: 'relevant',
        dynamicTags: []
      },
      currentPage: 1,
      pagesize: 10,
      pages_total: 0,
      has_edit: false,
      inputVisible: false,
      inputValue: ''
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
