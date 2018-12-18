<template>
    <div id="main">
        <el-form :inline="true">
            <el-form-item>
                <el-row class="demo-autocomplete">
                    <el-col>
                        <el-autocomplete
                            class="inline-input"
                            v-model="wpTagName"
                            :fetch-suggestions="wpTagNameSearch"
                            placeholder="请输入您想查询的标签名"
                            prefix-icon="el-icon-search"
                            clearable>
                        </el-autocomplete>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item>
                <el-row class="demo-autocomplete">
                    <el-col>
                        <el-autocomplete
                            class="inline-input"
                            v-model="wpLang"
                            :fetch-suggestions="wpLangSearch"
                            placeholder="请输入您想查询的语言"
                            prefix-icon="el-icon-search"
                            clearable>
                        </el-autocomplete>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item>
                <el-date-picker
                    v-model="dateTimePicker"
                    type="datetimerange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    placeholder="请选择日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button @click="fetchData">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="cacheData"
            :cell-style="cellStyle"
            :header-cell-style="rowClass"
            stripe
            ref="filterTable"
            border
            style="width:100%"
            id="table">
            <el-table-column
                prop="id"
                label="编号"
                column-key="id">
            </el-table-column>
            <el-table-column
                prop="wp_tag_id"
                label="标签编号"
                column-key="wp_tag_id">
            </el-table-column>
            <el-table-column
                prop="wp_tag_name"
                label="标签名"
                column-key="wp_tag_name">
            </el-table-column>
            <el-table-column
                prop="wp_group_id"
                label="群组编号"
                column-key="wp_group_id">
            </el-table-column>
            <el-table-column
                prop="wp_group_name"
                label="群组名"
                column-key="wp_group_name">
            </el-table-column>
            <el-table-column
                prop="wp_group_color"
                label="群组颜色"
                column-key="wp_group_color">
            </el-table-column>
            <el-table-column
                prop="wp_lang"
                label="语言"
                column-key="wp_lang">
            </el-table-column>
            <el-table-column
                prop="wp_group_link"
                label="群组链接"
                column-key="wp_group_link">
            </el-table-column>
            <el-table-column
                prop="tt"
                label="时间"
                column-key="tt">
            </el-table-column>
        </el-table>

        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNumber">
        </el-pagination>
    </div>
</template>

<script>
    import { selectedUser } from '@/api/get/get.js'
    const echarts = require('echarts')

    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                id: 0,
                wp_tag_id: 0,
                wp_tag_name: '',
                wp_group_id: 0,
                wp_group_name: '',
                wp_group_color: '',
                wp_lang: '',
                wp_group_link: '',
                tt: '',
                tableData: [],
                cacheData: [],
                wpTagName: '',
                tagName: [],
                wpLang: '',
                lang: [],
                totalNumber: 0,
                dateTimePicker: '',
                dateTime: '',
                pickerOptions: {
                    shortcuts: [{
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600*1000*24*7)
                            picker.$emit("pick", [start, end])
                        }
                    }, {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600*1000*24*30)
                            picker.$emit("pick", [start, end])
                        }
                    }, {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600*1000*24*90)
                            picker.$emit("pick", [start, end])
                        }
                    }]
                }
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.datetime()
                selectedUser({"wp_tag_name": this.wpTagName, "wp_lang": this.wpLang, "tt1": this.dateTime[0], "tt2": this.dateTime[1], "pageSize": this.pageSize, "currentPage": this.currentPage}).then(response => {
                    console.log(response.data.data)
                    this.tableData = response.data.data[1]
                    this.cacheData = response.data.data[1]
                    this.totalNumber = response.data.data[0]
                })
            },
            handleSizeChange: function(size) {
                this.pageSize = size
                this.fetchData()
            },
            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage
                this.fetchData()
            },
            wpTagNameSearch(queryString, callback) {
                var tagName = this.tagName
                var results = queryString ? tagName.filter(this.createTagNameFilter(queryString)) : tagName
                callback(results)
            },
            createTagNameFilter(queryString) {
                return (tagName) => {
                    return (tagName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
                }
            },
            loadTagName() {
                return [
                    {"value":"Social & Friendship"}, {"value":"Fan Clubs"}, 
                    {"value":"+18"}, {"value":"All"}, {"value":"Funny"}, 
                    {"value":"Relationships"}, {"value":"Games"}, {"value":"Food"}, 
                    {"value":"Science & Tech"}, {"value":"Community"}, 
                    {"value":"Art & Photography"}, {"value":"Roleplay"}, 
                    {"value":"Business"}, {"value":"Buy and Sell"}, 
                    {"value":"Spiritual"}, {"value":"Politics & News"}, 
                    {"value":"Sports"}, {"value":"School & Education"}, 
                    {"value":"Style"}, {"value":"Health & Fitness"}, 
                    {"value":"Travel & Places"}, {"value":"Animals & Pets"}
                ]
            },
            wpLangSearch(queryString, callback) {
                var lang = this.lang
                var results = queryString ? lang.filter(this.createLangFilter(queryString)) : lang
                callback(results)
            },
            createLangFilter(queryString) {
                return (lang) => {
                    return (lang.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
                }
            },
            loadLang() {
                return [
                    {"value":"xx"}, {"value":"hi"}, 
                    {"value":"pt"}, {"value":"es"}, 
                    {"value":"en"}, {"value":"tr"}, 
                    {"value":"de"}, {"value":"ms"}
                ]
            },
            datetime() {
                if (!this.dateTimePicker) {
                    this.dateTime = ''
                }
                else {
                    var datetime1 = new Date(this.dateTimePicker[0])
                    var datetime2 = new Date(this.dateTimePicker[1])
                    var dateTime1 = datetime1.getFullYear() + '-' + (datetime1.getMonth() + 1) + '-' + datetime1.getDate() + ' ' + datetime1.getHours() + ':' + datetime1.getMinutes() + ':' + datetime1.getSeconds();
                    var dateTime2 = datetime2.getFullYear() + '-' + (datetime2.getMonth() + 1) + '-' + datetime2.getDate() + ' ' + datetime2.getHours() + ':' + datetime2.getMinutes() + ':' + datetime2.getSeconds();
                    this.dateTime = [dateTime1, dateTime2]
                }
            },
            cellStyle({ row, column, rowIndex, columnIndex }) {
                return "text-align:center"
            },
            rowClass({ row, rowIndex }) {
                return "text-align:center"
            }
        },
        mounted() {
            this.tagName = this.loadTagName()
            this.lang = this.loadLang()
        },
    }
</script>
