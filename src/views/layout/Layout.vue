<template>
    <el-container>
        <el-header>
            <h3>Whatsapp简易后台管理系统</h3>
        </el-header>
        <el-container>
            <el-aside width="160px" class="menu"><VerticalMenu></VerticalMenu></el-aside>
            <el-main class="main"><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script>
    import VerticalMenu from "@/components/Menu/VerticalMenu.vue"
    
    export default {
        name: 'App',
        components: {
            VerticalMenu
        }
    }
</script>
        
<style>
    .el-header {
        /* width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center; */
        background-color:#E0E0E0;
        padding:2px
    }
    .menu {
        background-color: #E8E8E8;
        text-align: center;
    }
    .main {
        background-color: #F0F0F0;
        text-align: center;
    }
</style> 
