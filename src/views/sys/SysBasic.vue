<template>
    <div>
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="部门管理" name="first"><DepManage/></el-tab-pane>
            <el-tab-pane label="职位管理" name="second"><PosManage/></el-tab-pane>
            <el-tab-pane label="职称管理" name="third"><JobLevelManage/></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="fourth"><EcManage/></el-tab-pane>
            <el-tab-pane label="权限组" name="fifth"><PermissionManage/></el-tab-pane>
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
              activeName:'second'
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