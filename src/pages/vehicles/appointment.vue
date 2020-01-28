<template>
  <v-row no-gutters>
    <v-col class="left_appointment" :cols="12" md="4" lg="4" sm="4">
      <v-carousel
        :show-arrows="true"
        hide-delimiter-background
        height="250px"
      >
        <v-carousel-item
          v-for="(color, i) in imgSrc"
          :key="i"
        >
          <v-sheet
            height="250px"
            tile
          >
            <v-row
              class="left_carous"
              align="center"
              justify="center"
            >
              <v-img :src="color.imgUrl" :lazy-src="color.imgUrl"></v-img>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-row class="mt-2 ml-0">
        <div class="cars_info">
          <v-img :src="vehicle_img"></v-img>
          <a href="#">检测流程</a>
        </div>

        <v-divider></v-divider>

        <div class="cars_info">
          <v-img :src="vehicle_img"></v-img>
          <a href="#">检测过程</a>
        </div>
      </v-row>
    </v-col>
    <v-col class="left_appointment ml-lg-5" :cols="12" md="5" lg="5" sm="5">
      <div id="fast_appointment" class="fast_appointment mx-auto" @click="fastAppoint">立即预约</div>
      <app-appoint :appointStatus="appointStatus" @close-dialog="closeDia"></app-appoint>
      <v-row class="mt-5 ml-md-1 ml-lg-1">
        <app_btn appBtnTitle="工作流程" color="#1E88E5"></app_btn>
        <app_btn appBtnTitle="预约流程" color="#1976D2"></app_btn>
        <app-btn-staff></app-btn-staff>
        <v-btn class="mx-2 mt-2" depressed large color="#BBDEFB" @click="faster_card">加速卡</v-btn>
      </v-row>
      <v-row class="fast_bot mt-2 ml-md-1 ml-lg-1">
        <div>
          <div><strong style="color: green;">城市分布</strong></div>
          <cn-region-picker
            v-model="pickCity"
            placeholder="城市"
          >
          </cn-region-picker>
        </div>

        <div class="mt-3">
          <i style="line-height: 10px;">我们承诺: 在一天内会根据您的定位进行车辆检测</i>
        </div>
      </v-row>
    </v-col>

    <v-spacer></v-spacer>
    <v-col class="left_appointment  ml-lg-4 d-none d-sm-block" md="2" lg="2" sm="2">
      <v-img :src="vehicle_adver_img" :lazy-src="vehicle_adver_img"></v-img>
    </v-col>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="propColor"
    >
      {{promptMsg}}
    </v-snackbar>
  </v-row>
</template>

<script>
  import app_btn from "./app_btn/app_btn";
  import appBtnStaff from "./app_btn/appBtnStaff";
  import appAppoint from "./app_btn/appAppoint";

  export default {
    name: "appointment",
    components: {app_btn, appBtnStaff, appAppoint},
    data() {
      return {
        colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
        imgSrc: [{
          imgUrl: require('../../assets/img/15771693185745100.jpg')
        }, {
          imgUrl: require('../../assets/img/15774360044992820.jpg')
        }, {
          imgUrl: require("../../assets/img/15774361962777130.jpg")
        }],
        vehicle_img: require("../../assets/img/vehicle_1.jpg"),
        vehicle_adver_img: require('../../assets/img/vehicle333.jpg'),
        fastScreenWidth: '', // 对应fast_appointment的宽度
        pickCity: [], //城市选择器
        snackbar: false, //提示框是否弹出
        promptMsg: '',//提示消息
        timeout: 2000, //提示框消失时间
        propColor: 'success', //提示主题颜色
        appointStatus: false, //改变弹框颜色
      }
    },
    //监听属性
    watch: {
      fastScreenWidth(val) {
        let fastApp = document.getElementById("fast_appointment");
        fastApp.style.height = val + "px";
        fastApp.style.lineHeight = val + "px";
      }
    },
    computed: {},
    mounted() {
      // 监听窗口大小
      let fastApp = document.getElementById("fast_appointment");
      let width = fastApp.offsetWidth;
      fastApp.style.height = width + "px";
      fastApp.style.lineHeight = width + "px";
      window.onresize = () => {
        return (() => {
          this.fastScreenWidth = document.getElementById("fast_appointment").offsetWidth;
        })()
      };
    },
    //销毁
    beforeDestroy() {
      //清空监听事件
      window.onresize = null;
    },
    methods: {
      //判断是否为手机端还是电脑端，手机端返回true
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      },
      faster_card() {
        this.promptMsg = "暂时未开通此功能";
        this.propColor = '#DCE775';
        this.snackbar = true;
      },
      fastAppoint() {
        this.appointStatus = !this.appointStatus;
      },
      //父子组件传值
      closeDia(msg) {
        this.appointStatus = false;
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .left_appointment {
    overflow: hidden;
    height: 430px;
  }

  .left_carous {
    height: 250px;
  }

  .cars_info {
    width: 48%;
    /*overflow: hidden;*/
    float: left;
  }

  .cars_info a {
    display: block;
    text-align: center;
    width: 100%;
    overflow: hidden;
    color: black;
    transition: all 0.3s;
  }

  .cars_info a:hover {
    color: orangered;
  }

  .fast_appointment {
    width: 50%;
    height: 230px;
    text-align: center;
    overflow: hidden;
    border-radius: 300px 300px;
    background-color: #EF9A9A;
    cursor: pointer;
    transition: all 0.3s;
  }

  .fast_appointment:hover {
    background-color: #C62828;
  }

  .fast_bot {
    height: 70px;
    background-color: #f5f5f5;
  }

  .fast_bot > div {
    float: left;
    width: 50%;
    height: 70px;
    text-align: center;
    font-size: 14px;
    border-right: 1px solid #e6e6e6;
  }


</style>
