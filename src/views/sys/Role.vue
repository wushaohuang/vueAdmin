<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.name"
            placeholder="用户"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getRoleList">
          搜索
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定要批量删除吗？" @confirm="delHandle(null)">
          <el-button type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="code"
          label="唯一编码"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="remark"
          label="描述"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态">
        <template slot-scope="scope">
          <el-tag type="success" size="small" v-if="scope.row.state === 1">正常</el-tag>
          <el-tag type="danger" size="small" v-else-if="scope.row.state === 0">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="option"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="permHandle(scope.row.id)">分配权限</el-button>
          <el-divider direction="vertical"></el-divider>
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
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size=size
          layout="total, sizes, prev, pager, next, jumper"
          :total=total>
      </el-pagination>
    </div>
    <!--新增对话框-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">
        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state" label-width="100px">
          <el-radio-group v-model="editForm.state">
            <el-radio :label=0>禁用</el-radio>
            <el-radio :label=1>正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="分配权限"
      :visible.sync="permDialogVisible"
      width="600px"
    >
      <el-form :model="permForm">
        <el-tree
            :data="permTreeData"
            :default-expand-all=true
            :check-strictly=true
            ref="permTree"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
        </el-tree>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitPermFormHandle('permForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Role',
  data() {
    return {
      searchForm: {},
      delBtlStatu: true,

      dialogVisible: false,

      tableData: [],
      multipleSelection: [],
      total: 100,
      current: 1,
      size: 10,

      editForm: {
        name: '',
        code: '',
        remark: '',
        state: ''
      },
      editFormRules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入唯一编码', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ]
      },
      permForm: {},
      permDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      permTreeData: []
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delBtlStatu = val.length === 0
    },
    handleSizeChange(val) {
      this.size = val
      this.getRoleList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getRoleList()
    },
    editHandle(id) {
      this.$axios.get('/sys/role/info/' + id).then(res => {
        this.editForm = res.data.data
        this.dialogVisible = true
      })
    },
    onSubmit () {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/role' + (this.editForm.id?'update': 'save'), this.editForm).then(res => {
            this.$message({
              showClose: true,
              message: '恭喜你，操作成功',
              type: 'success',
              onClose: () => {
                this.getRoleList()
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
    getRoleList() {
      this.$axios.get("/sys/role/list", {
        params: {
          name: this.searchForm.name,
          current: this.current,
          size: this.size
        }
      }).then(res => {
        this.tableData = res.data.data.records
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total
      })
    },
    delHandle (id) {
      var ids =[]
      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }

      this.$axios.post("/sys/role/delete/" + ids).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功！',
          type: 'success',
          onClose: () => {
            this.getRoleList()
          }
        })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.editForm = {}
    },
    permHandle(id) {
      this.permDialogVisible = true;
      this.$axios.get("/sys/role/info" + id).then(res => {
        this.$refs.permTree.setCheckedKeys(res.data.data.menuIds)
        this.permForm = res.data.data
      })
    },
    submitPermFormHandle(formName) {
      var menuIds = this.$refs.permTree.getCheckedKeys()
      this.$axios.post('/sys/role/perm/' + this.permForm.id, menuIds).then(res => {
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: "success",
          onClose: () => {
            this.getRoleList()
          }
        });
        this.permDialogVisible = false
      })
    }
  },
  created() {
    this.getRoleList();
    this.$axios.get('/sys/menu/list').then(res => {
      this.permTreeData = res.data.data
    })
  }
}
</script>

<style scoped>
  .el-pagination {
    float: right;
    margin-top: 20px;
  }
</style>
