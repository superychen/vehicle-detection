<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>预约检测</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <i v-if="isVehicle === false">感谢您信任我们</i>
          <v-select
            v-if="isVehicle === true"
            :items="vehicleInfoList"
            item-text="vehicleNumber"
            item-value="id"
            label="请选择对应车辆进行预约"
            @change="chageSelect"
            background-color="#90CAF9"
            solo
          ></v-select>
        </v-toolbar-items>
      </v-toolbar>

      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          银行卡4要素认证
          <small>对您进行一个身份认证</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-col md="6">
            <v-card color="blue lighten-5" class="mb-12">
              <app-bank @bankRes="bankRes" @changeStepper="chageSte"></app-bank>
            </v-card>
          </v-col>

        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">车辆信息录入</v-stepper-step>

        <v-stepper-content step="2">
          <v-col md="6">
            <v-card color="blue lighten-5" class="mb-12">
              <app-vehicle @vehicleRes="vehicleRes" @changeStepper="chageSte"></app-vehicle>
            </v-card>
          </v-col>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">确认地点</v-stepper-step>
        <v-stepper-content step="3">
          <v-card color="blue lighten-5">
            <app-map @appointAddress="appAddress" :vehicleId="vehicleId" :cityName="cityName"
                     @changeStepper="chageSte"></app-map>
          </v-card>
        </v-stepper-content>

        <v-stepper-step step="4">立即预约</v-stepper-step>
        <v-stepper-content step="4">
          <v-btn color="primary" @click="appointRightNow">立即预约</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="propColor"
    >
      {{promptMsg}}
    </v-snackbar>
  </v-dialog>

</template>

<script>
  import appBank from "../../../components/form_appoint/appBank";
  import appVehicle from "../../../components/form_appoint/appVehicle";
  import appMap from "../../../components/form_appoint/appMap";

  export default {
    name: "appAppoint",
    components: {appBank, appVehicle, appMap},
    props: ['appointStatus', 'cityName'],
    data() {
      return {
        dialog: false,
        e6: 1,
        snackbar: false, //提示框是否弹出
        promptMsg: '',//提示消息
        timeout: 2000, //提示框消失时间
        propColor: '#D4E157', //提示主题颜色
        bankInfo: {},//银行卡4要素信息
        isVehicle: false, //是否录入过汽车信息
        vehicleInfoList: null, //只有录入过汽车信息才能对其赋值
        vehicleId: 0,//这个是向后台传递的车辆信息的id
        vehicleAddress: '',//详细地址
      }
    },
    watch: {
      appointStatus: {
        handler(newVal, oldVal) {
          this.dialog = newVal;
        }
      }
    },
    methods: {
      closeDialog() {
        this.dialog = false;
        this.$emit('close-dialog', this.dialog);
      },
      //监听子组件,改变步骤数
      chageSte(step) {
        this.e6 = step;
      },
      //所有步骤完成,进入立即预约
      appointRightNow() {
        console.log("---------预约---------");
        let username = this.$Cookies.get('username');
        this.$axios.post('apis/vehicle/vehicle/appoint', this.$qs.stringify({
          vehicleInfoId: this.vehicleId,
          appointAddress: this.vehicleAddress,
          appointUsername: username,
        })).then(res => {
          console.log(res.data);
          if (res.data.code === 200) {
            //todo 进行支付,调用支付宝微信接口
            this.validSnackbar(true, 'success', '预约成功,我们工作团队会尽快联系您');
            setTimeout(() => {
              this.$router.go(0)
            }, 2000);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 弹出框公共类
      validSnackbar(snackbar, propColor, promptMsg) {
        this.snackbar = snackbar;
        this.propColor = propColor;
        this.promptMsg = promptMsg;
      },
      //监听银行卡信息输入
      bankRes(res) {
        this.bankInfo = res;
      },
      //监听汽车信息输入
      vehicleRes(res) {
        let VehicleInfoVo = res;
        this.$set(VehicleInfoVo, "bankVo", this.bankInfo);
        this.$axios.post('apis/vehicle/vehicle/info', VehicleInfoVo).then(res => {
          if (res.data.code === 200) {
            this.initVehicle();
            this.$snackbar.info(res.data.data, '#42A5F5')
          } else if (res.data.code === 1024) {
            this.$snackbar.info(res.data.data, '#42A5F5')
          }
        }).catch(err => {
          console.log(err);
        });
        console.log(VehicleInfoVo);
      },

      //切换车辆信息ID
      chageSelect(val) {
        if (val === 0) {
          this.e6 = 1;
        } else {
          this.vehicleId = val;
          this.e6 = 3;
        }
      },

      //监听地址变化
      appAddress(res) {
        console.log("-------");
        console.log(res);
        this.vehicleAddress = res;
      },

      //初始化用户车辆数据
      initVehicle() {
        this.$axios.get('apis/vehicle/vehicle/info').then(res => {
          if (res.data.code === 200) {
            this.e6 = 3;
            this.isVehicle = true;
            this.vehicleInfoList = res.data.data;
          } else if (res.data.code === 10086) {
            this.e6 = 1;
          }
        }).catch(err => {
          console.log(err);
        });
      },

    },
    created() {
      this.initVehicle();
    }
  }
</script>

<style scoped>

</style>
