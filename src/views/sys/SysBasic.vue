<template>
    <div>
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="部门管理" name="depManage"><DepManage/></el-tab-pane>
            <el-tab-pane label="职位管理" name="posManage"><PosManage/></el-tab-pane>
            <el-tab-pane label="职称管理" name="jobLevelManage"><JobLevelManage/></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="ecManage"><EcManage/></el-tab-pane>
            <el-tab-pane label="权限组" name="permissionManage"><PermissionManage/></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import DepManage from "../../components/sys/basic/DepManage";
    import EcManage from "../../components/sys/basic/EcManage";
    import JobLevelManage from "../../components/sys/basic/JobLevelManage";
    import PermissionManage from "../../components/sys/basic/PermissionManage";
    import PosManage from "../../components/sys/basic/PosManage";

    export default {
        name: "SysBasic",
        data(){
            return{
              activeName:'depManage'
            }
        },
        components:{
            DepManage,
            EcManage,
            JobLevelManage,
            PermissionManage,
            PosManage
        }
    }
</script>

<style scoped>

</style>