<template>
  <div class="login_particle">
    <vue-particles class="login_particle"></vue-particles>
    <v-card
      v-show="showSignUp === false"
      class="mx-auto"
      style="margin-top: 10%;"
      max-width="344"
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="username"
          :counter="10"
          :rules="usernameRules"
          label="用户名"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="密码"
          required
        ></v-text-field>

        <v-row>
          <v-col md="6">
            <v-text-field
              v-model="verCode"
              :rules="verCodeRules"
              label="验证码"
              required
            ></v-text-field>
          </v-col>
          <v-col md="6">
            <v-img :src="imgUrl" width="120px" height="30px" @click="changeImg" class="mt-4"></v-img>
          </v-col>
        </v-row>
      </v-form>


      <v-card-actions>
        <v-btn color="primary" @click="validate">登录</v-btn>

        <v-btn @click="signUp">注册</v-btn>

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            第三方登录暂时未开通
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <v-card
      v-show="showSignUp"
      class="mx-auto"
      style="margin-top: 10%;"
      max-width="500"
    >
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          class="subheading white--text"
          style="cursor: pointer;"
          size="24"
          @click="closeSignUp"
        >
          <v-icon>mdi-backspace-outline</v-icon>
        </v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              label="用户名"
              v-model="signAccount.username"
            ></v-text-field>
            <span class="caption grey--text text--darken-1">
              这个用户名是您的唯一标识
            </span>
            <v-distpicker class="mt-4" :province="select.province" :city="select.city" :area="select.area"
                          :placeholders="placeholders" 　@selected="onSelected"></v-distpicker>
            <span class="caption grey--text text--darken-1">
              请选择自己对应的城市地址
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              label="密码"
              type="password"
              v-model="signAccount.password"
            ></v-text-field>
            <v-text-field
              label="确认密码"
              v-model="signAccount.confirmPassword"
              type="password"
            ></v-text-field>
            <v-row>
              <v-col md="6">
                <v-text-field
                  label="电话号码"
                  v-model="signAccount.telephone"
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-btn :disabled="signAccount.codeDisabled" @click="sendMessage">{{signAccount.codeMessage}}</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <v-text-field
                  label="验证码"
                  v-model="signAccount.telephoneCode"
                ></v-text-field>
              </v-col>
            </v-row>
            <span class="caption grey--text text--darken-1">
            请为您的账号输入密码
          </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="title font-weight-light mb-2">恭喜注册成功</h3>
            <v-btn text large @click="signUptoLogin">去登陆</v-btn>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          :disabled="step !== 2"
          text
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="step === 3"
          color="primary"
          depressed
          @click="nextRegister"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'

  export default {
    name: "login",
    components: {VDistpicker},
    data: () => ({
      step: 1,
      showSignUp: false,
      signAccount: {
        username: '',//注册账号名
        password: '',//密码
        confirmPassword: '',//确认密码
        address: '',//注册地址
        telephoneCode: '', //电话验证码
        codeMessage: '发送短信验证码',
        codeDisabled: false,
        telephone: "",
      },
      timer: null,//定义一个计时器
      //城市选择
      select: {province: '', city: '', area: ''},
      placeholders: {
        province: '------- 省 --------',
        city: '--- 市 ---',
        area: '--- 区 ---',
      },
      show: false,
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || '用户名不能为空',
      ],
      password: '',
      passwordRules: [
        v => !!v || '密码不能为空',
      ],
      imgUrl: '',
      verCode: '',//验证码
      verCodeRules: [
        v => !!v || '验证码不能为空',
      ],
    }),
    computed: {
      currentTitle() {
        switch (this.step) {
          case 1:
            return '注册'
          case 2:
            return '输入密码'
          default:
            return '账号注册'
        }
      },
    },
    mounted() {
      //初始化图片验证码
      this.changeImg();
    },
    methods: {
      signUp() {
        this.showSignUp = true;
      },
      //关闭注册
      closeSignUp() {
        this.signAccount.username = '';
        this.signAccount.password = '';
        this.signAccount.confirmPassword = '';
        this.step = 1;
        this.showSignUp = false;
      },
      //从注册到登录
      signUptoLogin() {
        this.closeSignUp();
      },
      //登录
      validate() {
        //先删除,不然带过去的请求头有两个auth
        this.$Cookies.remove('token');
        if (!this.$refs.form.validate()) {
          this.$snackbar.info('信息输入不正确', '#EF5350')
          return false;
        }
        let imgUuid = localStorage.getItem("imgUuid");
        this.$axios.post('apis/login-sms/login', this.$qs.stringify({
          username: this.username,
          password: this.password,
          imgCode: this.verCode,
          imgUuid: imgUuid,
        })).then(res => {
          if (res.data.code === 200) {
            //讲用户登录时的token存入到cookie中去，并且设置为1天之后过期
            this.$Cookies.set('token', res.data.data.jwt.access_token, {expires: 1});
            this.$Cookies.set('username',res.data.data.username,{expires: 1});
            this.$snackbar.info('登录成功', 'success');
            setTimeout(() => {
              this.$router.push({path: "/home"})
            }, 1500)
          }
        }).catch(err => {
          console.log(err.response);
        })
      },
      changeImg() {
        if (!localStorage.getItem("imgUuid")) {
          let timestamp = new Date().getTime();
          let deviceId = this.uuid.uuid(16, 32).replace(/-/g, "") + timestamp;
          localStorage.setItem('imgUuid', deviceId);
          this.imgUrl = "apis/login-sms/comm/img?imgUuid=" + deviceId;
        } else {
          let imgUuid = localStorage.getItem("imgUuid");
          this.imgUrl = "apis/login-sms/comm/img?imgUuid=" + imgUuid + '&random=' + Math.random();
        }
      },
      nextRegister() {
        if (this.step === 1) {
          //验证
          if (this.signAccount.username === null || this.signAccount.username === '') {
            this.$snackbar.info('请输入注册的用户名', '#D32F2F');
            return false;
          }
          if (this.select.province === '' || this.select.city === '' || this.select.area === '') {
            this.$snackbar.info('请选择城市地区', '#D32F2F');
            return false;
          }
          this.signAccount.address = this.select.province + this.select.city + this.select.area;
          this.$axios.get('apis/login-sms/register/isReg/' + this.signAccount.username + '').then(res => {
            if (res.data.code === 200) {
              this.$snackbar.info('该账号可用', 'success');
              this.step++;
            }
          }).catch(err => {
            this.$snackbar.info('系统异常,服务器爆炸', '#D32F2F');
            console.log(err.response);
          })
        } else if (this.step === 2) {
          //注册
          if (this.signAccount.password === '' || this.signAccount.password !== this.signAccount.confirmPassword) {
            this.$snackbar.info('两次密码校验不正确', '#D32F2F');
            return false;
          }
          let userVo = {
            username: this.signAccount.username,
            password: this.signAccount.password,
            address: this.signAccount.address,
            telephone: this.signAccount.telephone,
            telephoneCode: this.signAccount.telephoneCode,
          };
          this.$axios.post('apis/login-sms/register/reg', userVo).then(res => {
            console.log(res.data);
            if (res.data.code === 200) {
              this.$snackbar.info("注册成功","success");
              this.step = 3;
            }
          }).catch(err => {
            console.log(err.response);
          })
          console.log("第二步")
        }
      },
      onSelected(data) {
        this.select.province = data.province.value;
        this.select.city = data.city.value;
        this.select.area = data.area.value;
        if (data.province.code === undefined || data.city.code === undefined || data.area.code === undefined) {
          this.select.province = '';
          this.select.city = '';
          this.select.area = '';
        }
      },
      //发送短信验证码
      sendMessage() {
        if (this.signAccount.telephone === null || this.signAccount.telephone === '') {
          this.$snackbar.info('输入的手机号码格式不正确', '#D32F2F');
          return false;
        }
        let timeCount = 60; //定义时间为60秒
        this.$axios.post('apis/login-sms/comm/sms', this.$qs.stringify({
          telephone: this.signAccount.telephone,
        })).then(res => {
          if (res.data.code === 200) {
            this.timer = setInterval(() => {
              timeCount--;
              this.signAccount.codeMessage = timeCount + "后可再次发送验证码";
              this.signAccount.codeDisabled = true;
              if (timeCount <= 0) {
                clearInterval(this.timer);
                this.signAccount.codeDisabled = false;
                this.signAccount.codeMessage = "发送验证码";
              }
            }, 1000);
          }
        }).catch(err => {
          console.log(err.response);
        });
      },
    },
  }
</script>

<style scoped>
  .login_particle {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #616161;
  }
</style>
