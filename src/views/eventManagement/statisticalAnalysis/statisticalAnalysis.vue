<template>
    <div class="consoles">
        <div class="left" id="echartsWarp">
            <div id="myChartleft" class="myChartleft"></div>
        </div>
        <div class="right">
            <div id="myChartright" class="myChartright" ></div>
        </div>
        <div class="bottom">
            <div id="myChartbottom" class="myChartbottom" ></div>
        </div>
    </div>

    </div>
</template>

<script>
    import { eventmanagementStatsanal, } from "@/api/eventManagement/event.js";
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        data() {
            return {
                StatsanalList:{},
                dataArr:[],
                drawLinelist:{
                    xAxislist:[],
                    yAxislist:[]
                },
                drawpielist:{
                    xAxislist:[],
                    yAxislist:[]
                },
                drawbarlist:{
                    xAxislist:[],
                    yAxislist1:[],
                    yAxislist2:[]
                },
            }
        },
        created() {
            this.getdaynoworold()
            this.eventmanagementStatsanal()
        },
        mounted() {
            this.drawLine()
            this.drawpie()
            this.drawbar()
            window.onresize = () => {
                let myChartlefts = echarts.init(document.getElementById('myChartleft'));
                let myChartrights = echarts.init(document.getElementById('myChartright'))
                let myChartbottoms = echarts.init(document.getElementById('myChartbottom'))
                myChartlefts.resize();
                myChartrights.resize()
                myChartbottoms.resize()

            }
        },
        computed: {

        },
        watch: {
            // this.drawpielist.xAxislist (){
            //     this.drawLine()
            // }

        },
        methods: {

            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChartleft'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '近一周' ,padding:[0,0,0,30]},
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: {
                        type: 'category',
                        // boundaryGap: false,
                        data: this.drawpielist.xAxislist
                    },
                    yAxis: [{
                        name:'事件处理率%'
                    }],
                    series: [
                        {
                            name:'处理率',
                            type:'line',
                            data:this.drawpielist.yAxislist,
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },

                    ]
                });
            },
            drawpie() {
                // 基于准备好的dom，初始化echarts实例
                let myChart_ = echarts.init(document.getElementById('myChartright'))
                // 绘制图表
                myChart_.setOption({
                    title: { text: ' ' ,padding:[0,0,0,30]},
                    tooltip: {
                        trigger: 'axis',
                    },

                    xAxis: {
                        data: this.drawLinelist.xAxislist
                    },
                    yAxis: [{
                        name:'近一周发生事件数'
                    }],
                    series: [
                        {
                            name:'进入量',
                            type:'line',
                            data:this.drawLinelist.yAxislist,

                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },

                    ]
                })
            },
            drawbar() {
                // 基于准备好的dom，初始化echarts实例
                let myChart_b = echarts.init(document.getElementById('myChartbottom'))
                // 绘制图表
                myChart_b.setOption({

                    tooltip: { //触发鼠标经过 弹窗
                        show: true,
                        trigger: 'axis'
                    },
                    legend: {
                        data:['待处理','已处理','处理中']
                    },
                    xAxis: {
                        type: 'category',
                        data: this.drawbarlist.xAxislist,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'待处理',
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar',
                            barWidth: '30', //柱形图宽度
                            itemStyle: {
                                normal: {
                                    color: '#ff79bc', //背景色
                                    label: { // 在柱形图上显示具体数据
                                        show: true,
                                        position: 'top', // 所在的位置
                                        textStyle: { // 数据展示的样式
                                            fontSize: '20',
                                            fontWeight: 'bold',
                                            color: 'skyblue'
                                        }
                                    },
                                }
                            }
                        },
                        {
                            name:'已处理',
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar',
                            barWidth: '30', //柱形图宽度
                            itemStyle: {
                                normal: {
                                    color: 'pink', //背景色
                                    label: { // 在柱形图上显示具体数据
                                        show: true,
                                        position: 'top', // 所在的位置
                                        textStyle: { // 数据展示的样式
                                            fontSize: '20',
                                            fontWeight: 'bold',
                                            color: 'skyblue'
                                        }
                                    },
                                }
                            }
                        },
                        {
                            name:'处理中',
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar',
                            barWidth: '30', //柱形图宽度
                            itemStyle: {
                                normal: {
                                    color: '#00e3e3', //背景色
                                    label: { // 在柱形图上显示具体数据
                                        show: true,
                                        position: 'top', // 所在的位置
                                        textStyle: { // 数据展示的样式
                                            fontSize: '20',
                                            fontWeight: 'bold',
                                            color: 'skyblue'
                                        }
                                    },
                                }
                            }
                        }

                    ]
                })
            },
            getdaynoworold () {
                let datalist = []
                for (var i=-1;i>=-7;i--) {
                    datalist.push( this.getDay(i) )
                }
                this.dataArr = datalist.reverse()
            },
            getDay(day){
                let today = new Date();
                let targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
                today.setTime(targetday_milliseconds);
                let tYear = today.getFullYear();
                let tMonth = today.getMonth();
                let tDate = today.getDate();
                tMonth = this.doHandleMonth(tMonth + 1);
                tDate = this.doHandleMonth(tDate);
                // console.log(tYear+"-"+tMonth+"-"+tDate)
                return tMonth+"-"+tDate;
            },
            doHandleMonth(month){
                var m = month;
                if(month.toString().length == 1){
                    m = "0" + month;
                }
                return m;
            },
            eventmanagementStatsanal () {
                let data = {
                    organizationId : 1,
                }
                eventmanagementStatsanal(data).then(res => {
                    if(res.data.code == 200) {
                        this.StatsanalList = res.data.data
                        let datalist =  res.data.data
                        //事件数
                        datalist.eventCount.map(item => {
                            this.drawLinelist.xAxislist.push(item.days.slice(5))
                            this.drawLinelist.yAxislist.push(item.count)
                        })
                        //事件处理率
                        datalist.treatmentRate.map(item => {
                            this.drawpielist.xAxislist.push(item.days.slice(5))
                            this.drawpielist.yAxislist.push(item.rate.substring(0,item.rate.length-1) )
                        })
                        //上报事件处理情况统计
                        datalist.treatmentSituation.map(item => {
                            this.drawbarlist.xAxislist.push(item.days.slice(5))
                            this.drawbarlist.yAxislist1.push(item.count)
                            this.drawbarlist.yAxislist2.push(item.state)
                        })
                        this.drawLine()
                        this.drawpie()
                        this.drawbar()
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .consoles {
        width: 100%;
        box-sizing: border-box;
        padding:0 23px 0 20px;
        overflow: hidden;
    }
    .consoles .left {
        width: 47%;
        height: 420px;
        background-color: #f1f6fc;
        border-radius: 4px;
        float: left;
        margin-bottom: 40px;
    }
    .consoles .right {
        width: 47%;
        height: 420px;
        float: right;
        background-color: #f1f6fc;
        border-radius: 4px;
        margin-left: 40px;
        margin-bottom: 40px;
    }
    .consoles .bottom {
        width: 100%;
        height: 500px;
        overflow: hidden;
        background-color: #f1f6fc;
        border-radius: 4px;
        margin: 0 auto;
    }
    .consoles .buttomleft {
        margin-top: 40px;
    }
    .consoles .left .titles, .consoles .right .titles{
        font-size: 24px;
        border-left: 4px solid #834ed5;
        padding-left: 9px;
        margin-left: 20px;
        margin-top: 30px;
    }
    .consoles .right .titles{
        margin-bottom: 40px;
    }
    .consoles .left .datanum {
        font-size: 18px;
        margin: 10px 0 10px 20px;

    }
    .consoles .left .datanum .span1{
        padding-right: 10px;
    }
    .line1{
        display: flex;
        justify-content: center;
    }
    .myChartleft {
        margin-top: 40px;
        width: calc(100%);
        height:400px;
    }
    .myChartright {
        margin-top: 40px;
        width: calc(100%);
        height:400px;
    }
    .myChartbottom {
        margin-top: 40px;
        width: calc(100%);
        height:460px;
    }
</style>
