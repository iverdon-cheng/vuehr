<template>
    <div>
        <div style="margin-top: 10px; display: flex;justify-content: center" >
            <el-input v-model="keywords" placeholder="通过用户名搜索用户……" prefix-icon="el-icon-search" style="width: 400px"></el-input>
            <el-button icon="el-icon-search" type="primary" size="small" style="margin-left: 5px" @click="doSearch">搜索</el-button>
        </div>
        <div class="hr-container">
            <el-card class="hr-card" v-for="(hr,index) in hrs" :key="index" >
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button style="float: right; padding: 3px 0; color: #ff0903" type="text" icon="el-icon-delete"  @click="deleteHr(hr)"></el-button>
                </div>
                <div>
                    <div class="img-container">
                        <img :src="hr.userFace"  :alt="hr.name" :title="hr.name" class="userFace-img">
                    </div>
                    <div class="userInfo-container">
                        <div>用户名：{{hr.name}}</div>
                        <div>手机号码：{{hr.phone}}</div>
                        <div>电话号码：{{hr.telephone}}</div>
                        <div>地址：{{hr.address}}</div>
                        <div>用户状态：
                            <el-switch
                                    v-model="hr.enabled"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="启用"
                                    inactive-text="禁用"
                                    @change="enableChange(hr)"
                            />
                        </div>
                        <div>用户角色：
                            <el-tag v-for="(item,index) in hr.roles" :key="index" type="success" style="margin-left: 2px" size="mini">
                                {{item.nameZh}}
                            </el-tag>
                            <el-popover
                                    placement="right"
                                    title="角色列表"
                                    width="200"
                                    trigger="click"
                                    @show="showPop(hr)"
                                    @hide="hidePop(hr)">
                                <el-select v-model="selectedRoles" multiple placeholder="请选择" size="small">
                                    <el-option
                                            v-for="(r,indexK) in allRoles"
                                            :key="indexK"
                                            :label="r.nameZh"
                                            :value="r.id">
                                    </el-option>
                                </el-select>
                                <el-button icon="el-icon-more" type="text" style="margin-left: 3px; color: #5a75ff" slot="reference"></el-button>
                            </el-popover>
                        </div>
                        <div>备注：{{hr.remark}}</div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SysHr",
        data(){
            return{
                keywords:'',
                hrs:[],
                allRoles:[],
                selectedRoles:[],
            }
        },
        mounted() {
            this.initHrs();
        },
        methods:{
            enableChange(hr){
                console.log(hr);
                delete hr.roles;
                this.putRequest("/system/hr/",hr).then(resp=>{
                    if (resp){
                        this.initHrs();
                    }
                })
            },
            deleteHr(hr){
                this.$confirm('此操作将永久删除该【'+hr.name+'】部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/hr/"+hr.id).then(resp=>{
                        if (resp){
                            this.initHrs();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            hidePop(hr){
                let roles = [];
                Object.assign(roles,hr.roles);
                let flag = false;
                if (roles.length != this.selectedRoles.length){
                    flag = true;
                }else {
                    for (let i=0; i<roles.length; i++){
                        let role = roles[i];
                        for (let j = 0; j<this.selectedRoles.length; j++){
                            let sr = this.selectedRoles[j];
                            if (role.id == sr){
                                roles.splice(i,1);
                                i--;
                                break;
                            }
                        }
                    }
                    if (roles.length!=0){
                        flag = true;
                    }
                }
                if (flag){
                    let url='/system/hr/role?hrid='+hr.id;
                    this.selectedRoles.forEach(sr=>{
                        url+='&rids='+sr
                    })
                    this.putRequest(url).then(resp=>{
                        if (resp){
                            this.initHrs();
                        }
                    })
                }
            },
            showPop(hr){
                this.initAllRoles();
                let roles = hr.roles;
                this.selectedRoles = [];
                roles.forEach(r=>{
                    this.selectedRoles.push(r.id)
                })
                console.log(this.selectedRoles);
            },
            initAllRoles(){
              this.getRequest("/system/hr/roles").then(resp=>{
                  if (resp){
                      this.allRoles = resp;
                  }
              })
            },
            initHrs(){
                this.getRequest("/system/hr/?keywords="+this.keywords).then(resp=>{
                    if (resp){
                        this.hrs = resp;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .hr-container{
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .hr-card{
        width: 350px;
        margin-bottom: 20px;
    }
    .userFace-img{
        width: 72px;
        height: 72px;
        border-radius: 72px;
    }
    .img-container{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .userInfo-container{
        margin-top: 20px;
        font-size: 13px;
        font-family: 微软雅黑;
        color: black;
    }
</style>