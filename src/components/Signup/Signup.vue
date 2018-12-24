<template>
    <el-row type="flex" justify="center">
        <el-form :model="user" :rules="rules" ref="signupForm" label-width="100px" class="demo-user" status-icon>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="user.name" placeholder="请输入您的用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password" v-model="user.checkPassword" placeholder="请再次输入密码" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-upload" @click="register">注册</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>
    
<script>
    import { signUp } from '@/api/get/get.js'

    export default {
        data() {
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请输入密码"))
                } else {
                    if (this.user.checkPassword !== '') {
                        this.$refs.signupForm.validateField('checkPassword')
                    }
                    callback()
                }
            }
            var validatePassword2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请再次输入密码"))
                } else if (value !== this.user.password) {
                    callback(new Error("两次输入密码不一致"))
                } else {
                    callback()
                }
            }
            return {
                activeName: 'second',
                user: {name: "", password: "", checkPassword: ""},
                rules: {
                    name: [
                        {required: true, message: "用户名不能为空", trigger: "blur"},
                        {min:2, max:16, message: "长度在2-16个字符", trigger: "blur"}
                    ],
                    password: [
                        {required: true, validator: validatePassword, trigger: "blur"}
                    ],
                    checkPassword: [
                        {required: true, validator: validatePassword2, trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            register() {
                this.$refs.signupForm.validate((valid) => {
                    if (valid) {
                        signUp({ "name": this.user.name, "password": this.user.password, "checkPassword": this.user.checkPassword}).then(response => {
                            console.log(response.data.data)
                            if (response.data.data == true) {
                                console.log(this.$store)
                                this.$store.dispatch('signup', this.user).then(() => {
                                    this.$notify({
                                        type: 'success',
                                        message: '注册成功，请登陆',
                                        duration: 2000
                                    })
                                    this.$router.replace("/login")
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '用户名已存在',
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