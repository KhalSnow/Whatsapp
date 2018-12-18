<template>
    <div id="main" style="width:1100px; height:600px">
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
                            :trigger-on-focus="false"
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
                            :trigger-on-focus="false"
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
                <el-button @click="handleBtnClick">绘图</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { makeChart } from '@/api/get/get.js'
    const echarts = require('echarts')

    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 20,
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
                },
                xAxis: [],
                yAxis: [],
                dateTime1: '',
                dateTime2: ''
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
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
            xAxisData() {
                this.datetime()
                var dateDiff = Math.floor((new Date(this.dateTime[1]).getTime()-new Date(this.dateTime[0]).getTime())/(1000*60*60*24))
                var currentDateTime = new Date(this.dateTimePicker[1])
                for (var i = 0; i < dateDiff; i++) {
                    var formerDateTime = new Date(currentDateTime - 1000*60*60*24*i)
                    formerDateTime = formerDateTime.getFullYear() + '-' + (formerDateTime.getMonth() + 1) + '-' + formerDateTime.getDate()
                    this.xAxis.push(formerDateTime)
                }
                console.log(this.xAxis)
            },
            async yAxisData() {
                this.datetime()
                var dateDiff = Math.floor((new Date(this.dateTime[1]).getTime()-new Date(this.dateTime[0]).getTime())/(1000*60*60*24))
                var currentDate = new Date(this.dateTimePicker[1])
                var result = await makeChart({"wp_tag_name": this.wpTagName, "wp_lang": this.wpLang, "dateDiff": dateDiff, "currentDate": currentDate})
                this.yAxis = result.data.data
                console.log(this.yAxis)
            },
            async handleBtnClick() {
                await this.xAxisData()
                await this.yAxisData()
                var myChart = echarts.init(document.getElementById('main'))
                myChart.setOption({
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: this.xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        type: "line",
                        data: this.yAxis
                    }]
                })
            }
        },
        mounted() {
            this.tagName = this.loadTagName()
            this.lang = this.loadLang()
        },
    }
</script>
