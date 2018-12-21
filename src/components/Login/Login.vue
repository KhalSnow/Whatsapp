<template>
    <p class="login">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录" name="first">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入您的用户名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" clearable auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-upload" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
                <register></register>
            </el-tab-pane>
        </el-tabs>
    </p>
</template>

<script>
    import { logIn } from '@/api/get/get.js'
    //import register from '@/components/register'

    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请输入密码"))
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass')
                    }
                    callback()
                }
            }
            return {
                activeName: 'first',
                ruleForm: {name: "", password: "", checkPass: ""},
                rules: {
                    name: [
                        {required: true, message: "用户名不能为空", trigger: "blur"},
                        {min:2, max:16, message: "长度在2-16个字符", trigger: "blur"}
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            handleClick(tab, event) {},
            login() {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        logIn({"name": this.user.name, "password": this.user.password}).then(response => {
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