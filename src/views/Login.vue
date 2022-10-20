<template>
  <div id="app">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
    </el-row>
  </div>
</template>
<script>
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 14px;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 14px;
  min-height: 36px;
}
</style>
