<template>
    <div class="consoles">
        <div class="left" id="echartsWarp">
            <div class="titles">今日游客量</div>
            <div class="datanum"><span class="span1">今日：23769</span><span>昨日：20956</span></div>
            <div id="myChartleft" class="myChartleft"></div>
        </div>
        <div class="right">
            <div class="titles">今日票务</div>
            <div id="myChartright" class="myChartright" >
            </div>
        </div>
        <div class="left buttomleft" id="echartsWarp">
            <div class="titles">设备统计</div>

            <div class="bigbox" style="margin: 30px 25px 0 25px;">
                <el-table
                        :data="tableDataleft"
                        border
                        style="width: 100%">
                    <el-table-column
                            label="设备icon"
                            align="center"
                            show-overflow-tooltip
                            >
                        <template slot-scope="scope">
                            <img style="width: 30px" :src="scope.row.iconPath" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="设备类型"
                            align="center"
                            show-overflow-tooltip
                            >
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="设备数量"
                            show-overflow-tooltip
                            align="center">
                    </el-table-column>
                </el-table>
            </div>



        </div>
        <div class="right buttomleft">
            <div class="titles">资源统计</div>
            <div class="bigbox" style="margin: 30px 25px 0 25px;">
                <el-table
                        :data="tableDataright"
                        border
                        style="width: 100%">
                    <el-table-column
                            label="设备icon"
                            align="center"
                    >
                     <template slot-scope="scope">
                            <img style="width: 30px" :src="scope.row.iconPath" alt="">
                    </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="设备类型"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="设备数量"
                            align="center">
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>

<script>
    import { homepageDateoverview, } from "@/api/console/console.js";

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
            dataArr:["0点","2点","4点","6点","8点","10点","12点","14点","16点","18点","20点","22点","24点"],
            dateoverview:'',
            tableDataleft:[],
            tableDataright:[]
        }
    },
    created() {
        this.homepageDateoverview()
    },
    mounted() {
        this.drawLine()
        this.drawbar()

        window.onresize = () => {
            let myChartlefts = echarts.init(document.getElementById('myChartleft'));
            let myChartrights = echarts.init(document.getElementById('myChartright'))
            myChartlefts.resize();
            myChartrights.resize()
        }


    },
    computed: {

    },
    watch: {
        // pieData: function (){
        //     this.initData()
        // }
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChartleft'))
            // 绘制图表
            myChart.setOption({
                title: { text: '日客流量变化趋势' ,padding:[0,0,0,30]},
                tooltip: {
                    trigger: 'axis',

                },
                legend: {
                    data:['进入量','流入量']
                },
                color:['#40685f','#6de0c6'],
                xAxis: {
                    data: this.dataArr
                },
                yAxis: {},
                series: [
                    {
                        name:'进入量',
                        type:'line',
                        data:[22, 33, 44, 55,66, 43, 80,34,43,55,67,89,23],

                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'流入量',
                        type:'line',
                        data:[2,5,55,77,66,22,41,22,25],

                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ]
                        }
                    }
                ]
            });
        },
        drawbar() {
            // 基于准备好的dom，初始化echarts实例
            let myChart_ = echarts.init(document.getElementById('myChartright'))
            // 绘制图表
            myChart_.setOption({
                title: { text: '日客流量变化趋势' ,padding:[0,0,0,30]},
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color:['#40685f', '#33bc9d','#4f9988','#6de0c6'],
                legend: {
                    orient: 'vertical',
                    right:"10%",
                    top:"70%",
                    width:200,
                    height:50,
                    data:['直接访问','邮件营销','联盟广告','视频广告']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['60%', '70%'],
                        center : ['35%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},

                        ]
                    }
                ]
            });
        },
        homepageDateoverview () {
            let data = {
                organizationId : 1,
            }
            homepageDateoverview(data).then(res => {
                if(res.data.code == 200) {
                    let resdata = res.data.data
                    this.tableDataleft = resdata.equipmentList
                    this.tableDataright = resdata.resourcesList
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
        padding: 60px 60px;
        /*background: white;*/

        /*overflow: hidden;*/
    }
    .consoles .left {

        width: 47%;
        height: 420px;
        background-color: #f1f6fc;
        border-radius: 4px;
        float: left;
    }
    .consoles .right {
        width: 47%;
        height: 420px;
        float: left;
        background-color: #f1f6fc;
        border-radius: 4px;
        margin-left: 60px;
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
        width: calc(100%);
        height:320px;
    }
    .myChartright {
        width: calc(100%);
        height:320px;
    }
    .a {
        width: 150px;
        height: 45px;
        border: 1px solid #303c58;
        float: left;
    }

    .box .a:nth-child(2){
        border-left: none;
        border-right: none;

    }
    .box .a:nth-child(1){
        border-bottom:none;
    }
    .box .a:nth-child(2){
        border-bottom:none;
    }
    .box .a:nth-child(3){
        border-bottom:none;
    }
    .bigbox .boxa .a {
        border-bottom:1px solid #303c58;
    }
</style>
