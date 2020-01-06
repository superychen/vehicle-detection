<template>
  <v-row no-gutters>
    <v-col :cols="12" md="6" lg="6" sm="12">
      <div :style="{height:height,width:width}" ref="myEchart"></div>
    </v-col>
    <v-col :cols="12" md="6" lg="6" sm="12">
      <div :style="{height:height,width:width}" ref="myEchart2"></div>
    </v-col>

  </v-row>
</template>

<script>
  export default {
    name: "vehicle",
    data: () => ({
      height: '300px',
      width: '90%',
      chart: null,
      userNumChart: null,
    }),
    methods: {
      //初始化用户注册图表
      initChartRegister() {
        this.chart = this.$echarts.init(this.$refs.myEchart);
        this.chart.setOption({
          backgroundColor: "#eee",
          title: {
            text: "用户注册量",
            left: "center",
            top: 20,
            textStyle: {
              color: "#ccc"
            }
          },

          tooltip: {},

          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一', '二', '三', '四', '五', '六']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330],
            type: 'line',
            areaStyle: {},
            center: ["50%", "50%"],
          }]
        })
        this.chart.resize();
      },
      //初始化用户浏览网站次数,用户预约车辆检测次数,用户点赞次数
      initUserChart() {
        this.userNumChart = this.$echarts.init(this.$refs.myEchart2);
        this.userNumChart.setOption({
          backgroundColor: "#eee",
          title: {
            text: "统计",
            left: "center",
            top: 20,
            textStyle: {
              color: "#ccc"
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['用户浏览网站次数', 'Step Middle', 'Step End']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '用户浏览网站次数',
              type: 'line',
              step: 'start',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'Step Middle',
              type: 'line',
              step: 'middle',
              data: [220, 282, 201, 234, 290, 430, 410]
            },
            {
              name: 'Step End',
              type: 'line',
              step: 'end',
              data: [450, 432, 401, 454, 590, 530, 510]
            }
          ],
        });
        this.userNumChart.resize();
      }

    },
    mounted() {
      this.initChartRegister();
      this.initUserChart();
    }
  }
</script>

<style scoped>

</style>
