<template>
    <div>
        <el-form :rules="rules" ref="loginForm"
                 :model="loginForm"
                 v-loading="loading"
                 element-loading-text="正在登录……"
                 element-loading-spinner="el-icon-loading"
                 class="loginContainer">
            <h3 class="loginTittle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入用户密码" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>

            <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>

            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    import {postKeyValueRequest} from "../utils/api";

    export default {
        name: "Login",
        data(){
            return{
                loading: false,
                loginForm:{
                    username: 'admin',
                    password: '123'
                },
                checked:true,
                rules:{
                    username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                    password:[{required:true,message:'请输入密码',trigger:'blur'}]
                }
            }
        },
        methods:{
            submitLogin(){
                this.loading = true;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
                            this.loading = false;
                            if (resp){
                                //alert(JSON.stringify(resp))
                                window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                                let path = this.$route.query.redirect;
                                this.$router.replace((path=='/' || path == undefined) ? "/home":path);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #ffffff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTittle{
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
</style>