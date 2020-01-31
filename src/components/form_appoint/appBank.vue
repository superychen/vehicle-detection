<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation="lazy-validation"
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="姓名"
      required
    ></v-text-field>

    <v-text-field
      v-model="idNum"
      :rules="idNumRules"
      label="身份证号"
      required
    ></v-text-field>

    <v-text-field
      v-model="bankNum"
      :rules="bankNumRules"
      label="银行卡号"
      required
    ></v-text-field>

    <v-row>
      <v-col md="8">
        <v-text-field
          v-model="phoneNum"
          :rules="phoneRules"
          label="手机号"
          required
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-btn color="#90CAF9" dark large @click="validPhone">发送验证码</v-btn>
      </v-col>
    </v-row>

    <v-text-field
      v-show="sendMessage"
      v-model="phoneCode"
      label="验证码"
      required
    ></v-text-field>

    <v-btn
      color="success"
      class="mr-4"
      @click="validate"
    >
      认证
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      重置
    </v-btn>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="propColor"
    >
      {{promptMsg}}
    </v-snackbar>
    <!--遮罩层-->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="48"></v-progress-circular>
    </v-overlay>
  </v-form>

</template>

<script>

  export default {
    name: "appBank",
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || '姓名不能为空',
        v => (v && v.length <= 10) || '姓名不得超出10个字符',
      ],
      idNum: '',
      idNumRules: [
        v => !!v || '身份证号不能为空',
        // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        v => (v && (v.length === 15 || v.length === 18)) || '身份证长度为15位以及18位',
      ],
      bankNum: '',
      bankNumRules: [
        v => !!v || '银行卡号码不能为空',
        v => (v && v.length === 19) || '银行卡格式输入错误',
      ],
      phoneNum: '',//电话号码
      phoneRules: [
        v => !!v || '电话不能为空',
        v => /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(v) || '手机号码格式不正确',
      ],
      phoneCode: '',//电话验证码
      snackbar: false, //提示框是否弹出
      promptMsg: '',//提示消息
      timeout: 2000, //提示框消失时间
      propColor: '#D4E157', //提示主题颜色
      overlay: false, //遮罩层
      sendMessage: false, //是否显示验证码
    }),

    methods: {
      validate() {
        if (!this.$refs.form.validate()) {
          this.validSnackbar(true, '#FF5252', '请填写正确的格式');
          return false;
        }
        if (this.phoneCode === '') {
          this.validSnackbar(true, '#FF5252', '验证码输入错误');
        }
        let vehicleInfo = {
          bankName: this.name,
          bankCardNum: this.idNum,
          bankNum: this.bankNum,
          phoneNum: this.phoneNum,
          phoneCode: this.phoneCode,
        };
        this.$axios.post('apis/vehicle/vehicle/bank', vehicleInfo).then(res => {
          if (res.data.code === 200) {
            this.$emit('changeStepper', 2);
            this.$emit('bankRes',vehicleInfo);
            this.$snackbar.info('银行卡4要素认证成功', '#26C6DA')
          }
        }).catch(err => {
          console.log(err);
        });
        //6222033100032328885
      },
      reset() {
        this.$refs.form.reset()
      },
      // 弹出框公共类
      validSnackbar(snackbar, propColor, promptMsg) {
        this.snackbar = snackbar;
        this.propColor = propColor;
        this.promptMsg = promptMsg;
      },
      validPhone() {
        let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
        if (!reg.test(this.phoneNum)) {
          this.validSnackbar(true, '#D4E157', '手机号码不正确,无法发送验证码！');
          return false;
        }
        this.overlay = true;
        setTimeout(() => {
          this.overlay = false;
          this.sendMessage = true;
        }, 3000);
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
