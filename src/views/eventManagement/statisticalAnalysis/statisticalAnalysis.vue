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
                screenWidth:document.body.clientWidth,
            }
        },
        created() {
            this.getdaynoworold()
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
                    title: { text: '近一周' ,padding:[0,0,0,30]},
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.dataArr
                    },
                    yAxis: [{
                        name:'事件处理率%'
                    }],
                    series: [
                        {
                            name:'处理率',
                            type:'line',
                            data:[22, 33, 44, 55,66, 43, 80,34,43,55,67,89,23],
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
                        data: this.dataArr
                    },
                    yAxis: [{
                        name:'近一周发生事件数'
                    }],
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

                    ]
                })
            },
            drawbar() {
                // 基于准备好的dom，初始化echarts实例
                let myChart_b = echarts.init(document.getElementById('myChartbottom'))
                // 绘制图表
                myChart_b.setOption({
                    legend: {},
                    tooltip: {},
                    dataset: {
                        dimensions: ['product', '2015', '2016', '2017'],
                        source: [
                            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
                            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
                            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
                            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                        ]
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
                })
            },
            getdaynoworold () {
                let datalist = []
                for (var i=-1;i>=-7;i--) {
                    datalist.push( this.getDay(i) )
                }
                this.dataArr = datalist
            },
            getDay(day){
                let today = new Date();
                let targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
                today.setTime(targetday_milliseconds); //注意，这行是关键代码
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
        width: 770px;
        height: 420px;
        background-color: #f1f6fc;
        border-radius: 4px;
        float: left;
        margin-bottom: 40px;
    }
    .consoles .right {
        width: 770px;
        height: 420px;
        float: right;
        background-color: #f1f6fc;
        border-radius: 4px;
        margin-left: 60px;
        margin-bottom: 40px;
    }
    .consoles .bottom {
        width: 1500px;
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
