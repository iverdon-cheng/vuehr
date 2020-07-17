<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">Lixi</div>
                <el-dropdown class="userInfo" @command="commandHandler">
                    <span class="el-dropdown-link">
                        {{user.name}}<i><img :src="user.userFace" alt=""></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="userInfo" >个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router>
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i style="color: #5a75ff; margin-right: 15px" :class="item.iconCls"></i>
                                <span s>{{item.name}}</span>
                            </template>
                            <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb >
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path == '/home'">
                        欢迎来到力玺微人事！
                    </div>
                    <router-view class="homeRouterView"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                user:JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed:{
          routes(){
              return this.$store.state.routes;
          }
        },
        methods:{
            // menuClick(index){
            //     this.$router.push(index);
            // },
            commandHandler(cmd){
                if (cmd == 'logout'){
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user")
                        this.$store.commit('initRoutes',[])
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .homeRouterView{
        margin-top: 25px;
    }
    .homeWelcome{
        text-align: center;
        font-size: 30px;
        font-family: 微软雅黑;
        color: #505458;
        padding-top: 50px;
    }
    .homeHeader{
        background-color: #5a75ff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 150px ;
        box-sizing: border-box;
    }

    .homeHeader .title{
        font-size: 30px;
        font-family: 微软雅黑;
        color: #eaeaea;
    }

    .homeHeader .userInfo{
        cursor: pointer;
    }
    .el-dropdown-link img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }
    .el-dropdown-link{
        display: flex;
        align-items: center;
    }
</style>