<template>
    <div>
        <el-row class="tac">
            <el-col>
                <el-menu
                    class="el-menu-vertical-demo"
                    router>
                    <el-menu-item index='/user'>
                        <i class="el-icon-service"></i>
                        <span slot="title">用户</span>
                    </el-menu-item>
                    <el-menu-item index='/chart'>
                        <i class="el-icon-menu"></i>
                        <span slot="title">图表</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {}
</script>
