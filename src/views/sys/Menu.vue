<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        stripe
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="perm"
          label="权限编码"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图标">
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型">
        <template slot-scope="scope">
          <el-tag type="success" size="small" v-if="scope.row.type === 0">目录</el-tag>
          <el-tag type="info" size="small" v-else-if="scope.row.type === 1">菜单</el-tag>
          <el-tag size="small" v-else-if="scope.row.type === 2">按钮</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="icon"
          label="图标">
        <template slot-scope="scope">
          <el-tag size="small">目录</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="path"
          label="菜单URL">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图标">
      </el-table-column>
      <el-table-column
          prop="component"
          label="菜单组件">
      </el-table-column>
      <el-table-column
          prop="orderNum"
          label="排序号">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
        <template slot-scope="scope">
          <el-tag type="success" size="small" v-if="scope.row.statu === 1">正常</el-tag>
          <el-tag type="danger" size="small" v-else-if="scope.row.statu === 0">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="option"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

<!--新增对话框-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="editForm.region" placeholder="请选择上级菜单">
            <template v-for="item in tableData">
              <el-option :label="item.name" :value="item.id"></el-option>
              <template v-for="child in item.children">
                <el-option :label="child.name" :value="child.id">
                  <span>{{"- " + child.name}}</span>
                </el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="perms" label-width="100px">
          <el-input v-model="editForm.perms" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" label-width="100px">
          <el-input v-model="editForm.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL" prop="path" label-width="100px">
          <el-input v-model="editForm.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单组件" prop="component" label-width="100px">
          <el-input v-model="editForm.component" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label=0>禁用</el-radio>
            <el-radio :label=1>正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序号" prop="orderNum" label-width="100px">
          <el-input-number v-model="editForm.orderNum" :min="1" label="排序号">1</el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        statu: 1,
        type: 0
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        statu: 0,
        type: 0
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        statu: 1,
        type: 0,
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          statu: 1,
          type: 1
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          statu: 1,
          type: 1
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        statu: 0,
        type: 0
      }],
      dialogVisible: false,
      editForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      editFormRules: {
        parentId: [
          {required: true, message: '请选择上级菜单', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        perms: [
          {required: true, message: '请输入权限编码', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
        orderNum: [
          {required: true, message: '请输入排序号', trigger: 'blur'}
        ],
        statu: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    },
    onSubmit() {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/menu' + (this.editForm.id?'update': 'save'), this.loginForm).then(res => {
            this.$message({
              showClose: true,
              message: '恭喜你，操作成功',
              type: 'success',
              onClose: () => {
                this.getMenuTree()
              }
            })
            this.dialogVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
        this.editForm = {}
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.editForm = {}
    },
    getMenuTree() {
      this.$axios.get("/sys/menu/list").then(res => {
        this.tableData = res.data.data
      })
    },
    editHandle (id) {
      this.$axios.get('/sys/menu/info/' + id).then(res => {
        this.editForm = res.data.data
        this.dialogVisible = true
      })
    },
    delHandle (id) {
      this.$axios.post("/sys/menu/delete/" + id).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功！',
          type: 'success',
          onClose: () => {
            this.getMenuTree()
          }
        })
      })
    }
  },
  created() {
    this.getMenuTree()
  }
}
</script>

<style scoped>


</style>
