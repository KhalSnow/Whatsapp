<template>
    <div id="app">
        <el-container>
            <el-header class="header">
                <div class="a">
                    <h3>Whatsapp简易后台管理系统</h3>
                    <div>
                        <el-button float="right" @click="login" size="mini">登录</el-button>
                        <el-button float="right" @click="signup" size="mini">注册</el-button>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside width='160px'><VerticalMenu></VerticalMenu></el-aside>
                <el-main><router-view/></el-main>
            </el-container>
        </el-container>
    </div>
</template>
      
<script>
    import VerticalMenu from "@/components/Menu/VerticalMenu.vue"
      
    export default {
        name: 'App',
        components: {
            VerticalMenu
        },
        methods: {
            login() {
                this.$router.replace('/login')
            },
            signup() {
                this.$router.replace('/signup')
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        }
    }
    </script>
      
<style>
    .a {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center
    }
</style>
