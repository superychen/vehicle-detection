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
      initChartRegister(xAisData,series) {
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
            data: xAisData
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: series,
            type: 'line',
            areaStyle: {},
            center: ["50%", "50%"],
          }]
        })
        this.chart.resize();
      },
      //初始化用户浏览网站次数,用户预约车辆检测次数,用户点赞次数
      initUserChart(xAisData,lookWebsiteSeries,vehicleSeries,websiteLikedCount) {
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
            data: ['用户浏览网站次数', '车辆检测数', '点赞数']
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
            data: xAisData,
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '用户浏览网站次数',
              type: 'line',
              step: 'start',
              data: lookWebsiteSeries,
            },
            {
              name: '车辆检测数',
              type: 'line',
              step: 'middle',
              data: vehicleSeries,
            },
            {
              name: '点赞数',
              type: 'line',
              step: 'end',
              data: websiteLikedCount
            }
          ],
        });
        this.userNumChart.resize();
      },
      //初始化用户所有数据
      userRegisterCount() {
        this.$axios.get('apis/login-sms/website/registe').then(res => {
          let xAisData = res.data.data.map(obj => {
            return obj.websiteMonth.substring(0,7)
          });
          let series  = res.data.data.map(obj => {
            return obj.userRegisterCount;
          });
          let lookWebsiteSeries = res.data.data.map(obj => {
            return obj.websiteLook;
          });
          let vehicleSeries = res.data.data.map(obj => {
            return obj.websiteVehicleAppoint;
          });
          let websiteLikedCount = res.data.data.map(obj => {
            return obj.websiteLikedCount;
          });
          this.initChartRegister(xAisData,series);
          this.initUserChart(xAisData,lookWebsiteSeries,vehicleSeries,websiteLikedCount);
        }).catch(err => {
          console.log(err);
        });
      }
    },
    mounted() {
      this.userRegisterCount();

    },
  }
</script>

<style scoped>

</style>
