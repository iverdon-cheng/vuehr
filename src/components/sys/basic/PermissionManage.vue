<template>
    <div>
        <div class="permissionManaTool">
            <el-input placeholder="请输入角色英文名" v-model="role.name" size="small" style="width:25%">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input placeholder="请输入角色中文名" v-model="role.nameZh" size="small" style="width:25%;margin-left: 5px"></el-input>
            <el-button size="small" type="primary" icon="el-icon-plus" style="margin-left: 10px" @click="doAddRole">添加角色</el-button>
        </div>

        <div style="margin-top: 15px; width: 700px">

            <el-collapse v-model="activeName" accordion @change="change">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0; color: #ff0903" icon="el-icon-delete" @click="doDeleteById(r.id,r.nameZh)"></el-button>
                        </div>
                        <div>
                            <el-tree
                                    node-key="id"
                                    ref="tree"
                                    :key="index"
                                    :default-checked-keys="selectedMenus"
                                    :data="allMenus" :props="defaultProps" show-checkbox></el-tree>
                            <div style="display: flex; justify-content: flex-end">
                                <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                                <el-button size="mini" type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>

            </el-collapse>
        </div>
    </div>



</template>

<script>
    export default {
        name: "PermissionManage",
        data(){
            return{
                role:{
                    name:'',
                    nameZh:''
                },
                activeName: -1,
                roles:[],

                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                allMenus:[],
                selectedMenus:[]
            }
        },
        methods:{
            doDeleteById(id,name){
                this.$confirm('此操作将永久删除该【'+name+'】角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/permission/role/"+id).then(resp=>{
                        if (resp){
                            this.initRoles();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doAddRole(){
                if (this.role.name && this.role.nameZh){
                    this.postRequest("/system/basic/permission/role",this.role).then(resp=> {
                        if (resp) {
                            this.initRoles();
                            this.role.name = '';
                            this.roles.nameZh= '';
                        }
                    })
                }else{
                    this.message.error("添加字段不能为空！");
                }
            },
            cancelUpdate(){
                this.activeName=-1;
            },
            doUpdate(rid,index){
                let tree = this.$refs.tree[index];
                let  selectedKeys = tree.getCheckedKeys(true);
                console.log(selectedKeys);
                let url = '/system/basic/permission/?rid='+rid;
                selectedKeys.forEach(key=>{
                    url+='&mids='+key;
                })
                this.putRequest(url).then(resp=>{
                    if (resp){
                        this.activeName=-1;
                    }
                })
            },
            initRoles(){
                this.getRequest("/system/basic/permission/").then(resp=>{
                    if (resp){
                        this.roles = resp;
                    }
                })
            },
            change(rid){
              if (rid){
                  this.initAllMenus();
                  this.initSelectedMenus(rid);
              }
            },

            initAllMenus(){
                this.getRequest("/system/basic/permission/menus").then(resp=>{
                    if (resp){
                        this.allMenus = resp;
                    }
                })
            },
            initSelectedMenus(rid){
                this.getRequest("/system/basic/permission/mids/"+rid).then(resp=>{
                    this.selectedMenus = resp;
                })
            }
        },
        mounted() {
            this.initRoles();
        }
    }
</script>

<style scoped>

</style>