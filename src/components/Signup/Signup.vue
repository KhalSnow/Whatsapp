<template>
    <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="user.name" placeholder="请输入您的用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="user.password" placeholder="请输入密码" type="password1" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="user.password" placeholder="请再次输入密码" type="password2" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-upload" @click="signup">注册</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>
    
<script>
    import { signUp } from '@/api/get/get.js'

    export default {
        data() {
            return {
                dialogVisible: false,
                user: {name: "", password1: "", password2: ""},
                rules: {
                    name: [
                        {required: true, message: "用户名不能为空", trigger: "blur"}
                    ],
                    password1: [
                        {required: true, message: "密码不能为空", trigger: "blur"}
                    ],
                    password2: [
                        {required: true, message: "密码不能为空", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            signup() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        signUp({"name": this.user.name, "password": this.user.password}).then(response => {
                            console.log(response.data.data)
                            if (response.data.data) {
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