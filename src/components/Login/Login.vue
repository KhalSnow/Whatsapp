<template>
    <el-row type="flex" justify="center">
        <el-form :model="user" :rules="rules" ref="loginForm" label-width="80px" status-icon>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="user.name" placeholder="请输入您的用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
    import { logIn } from '@/api/get/get.js'

    export default {
        data() {
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error("请输入密码"))
            //     } else {
            //         if (this.user.checkPass !== '') {
            //             this.$refs.user.validateField('checkPass')
            //         }
            //         callback()
            //     }
            // }
            return {
                user: {name: "", password: "" },
                rules: {
                    name: [
                        {required: true, message: "用户名不能为空", trigger: "blur"},
                        {min:2, max:16, message: "长度在2-16个字符", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            login() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        logIn({ "name": this.user.name, "password": this.user.password }).then(response => {
                            console.log(response.data.data)
                            if (response.data.data == true) {
                                console.log(this.$store)
                                this.$store.dispatch('login', this.user).then(() => {
                                    this.$notify({
                                        type: 'success',
                                        message: '欢迎您, ' + this.user.name,
                                        duration: 2000
                                    })
                                    this.$router.replace("/user")
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '用户名或密码错误',
                                    showClose: true
                                })
                            }
                        }).catch((err) => {
                            console.log(err)
                            this.$message({
                                type: 'error',
                                message: '网络错误，请重试',
                                showClose: true
                            })
                        })
                    }
                    else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss">
    .login {
        width: 400px;
        margin: 0 auto
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .el-tabsitem {
        text-align: center;
        width: 60px;
    }
</style>