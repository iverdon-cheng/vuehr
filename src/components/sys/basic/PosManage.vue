<template>
    <div>
        <div>
            <el-input
                    class="addPosInput"
                    size="small"
                    placeholder="添加职位"
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addPosition"
                    v-model="pos.name">
            </el-input>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition">添加</el-button>
        </div>
        <div class="posManageMain">
            <el-table
                    size="small"
                    :data="positions"
                    border
                    stripe
                    style="width: 70%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag size="small" type="success" v-if="scope.row.enabled">
                            已启用
                        </el-tag>
                        <el-tag size="small" type="danger" v-else="scope.row.enabled">
                            未启用
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
                title="修改职位"
                :visible.sync="dialogVisible"
                width="25%">
           <div>
               <div>
                   <el-tag>职位名称</el-tag>
                   <el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
               </div>
               <div style="margin-top: 5px">
                   <el-tag>是否启用</el-tag>
                   <el-switch
                           v-model="updatePos.enabled"
                           active-text="启用"
                           inactive-text="禁用" style="margin-left: 10px">
                   </el-switch>
               </div>
           </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary"  size="small" @click="doUpdate">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "PosManage",
        data(){
            return {
                pos:{
                  name: ''
                },
                positions:[],
                updatePos: {
                    name: '',
                    enabled:false
                },
                dialogVisible: false
            }
        },
        mounted() {
            this.initPositions();
        },
        methods:{
            doUpdate(){
                this.putRequest("/system/basic/pos/",this.updatePos).then(resp=>{
                    if (resp){
                        this.initPositions();
                        this.updatePos.name='';
                        this.dialogVisible=false;
                    }
                })
            },
            addPosition(){
              if (this.pos.name){
                  this.postRequest("/system/basic/pos/",this.pos).then(resp=>{
                      if (resp){
                          this.initPositions();
                          this.pos.name='';
                      }
                  })
              } else {
                  this.$message.error("职位名称不可以为空");
              }
            },
            showEditView(index,data){
                Object.assign(this.updatePos,data);
                this.dialogVisible=true;
            },
            handleDelete(index,data){
                this.$confirm('此操作将永久删除该【'+data.name+'】职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/pos/"+data.id).then(resp=>{
                        if (resp){
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initPositions(){
                this.getRequest("/system/basic/pos/").then(resp=>{
                    if (resp){
                        this.positions = resp;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .addPosInput{
        width: 300px;
        argin-right: 8px
    }

    .updatePosInput{
        width: 200px;
        margin-left: 10px;
    }

    .posManageMain{
        margin-top: 10px;
    }
</style>