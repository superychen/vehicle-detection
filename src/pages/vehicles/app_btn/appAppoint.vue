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
          <i>感谢您信任我们</i>
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
              <app-vehicle @changeStepper="chageSte"></app-vehicle>
            </v-card>
          </v-col>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">确认地点</v-stepper-step>
        <v-stepper-content step="3">
          <v-card color="blue lighten-5">
            <app-map @changeStepper="chageSte"></app-map>
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
    props: ['appointStatus'],
    data() {
      return {
        dialog: false,
        e6: 1,
        snackbar: false, //提示框是否弹出
        promptMsg: '',//提示消息
        timeout: 2000, //提示框消失时间
        propColor: '#D4E157', //提示主题颜色
        bankInfo : {},
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
        this.validSnackbar(true, 'success', '预约成功,我们工作团队会尽快联系您');
        setTimeout(() => {
          this.$router.go(0)
        }, 2000);
      },
      // 弹出框公共类
      validSnackbar(snackbar, propColor, promptMsg) {
        this.snackbar = snackbar;
        this.propColor = propColor;
        this.promptMsg = promptMsg;
      },
      bankRes(res) {
        this.bankInfo = res;
        console.log(this.bankInfo)
      }
    }
  }
</script>

<style scoped>

</style>
