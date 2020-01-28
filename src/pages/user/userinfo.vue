<template>
  <v-row>
    <v-col md="4">
      <v-card
        class="ml-md-12"
        max-width="350"
        outlined
      >
        <v-row>
          <v-col md="3">
            <v-img width="150" height="80"  :src="src"></v-img>
          </v-col>
          <v-col md="9">
            <h4>欢迎使用新型汽车检测系统</h4>
            <div>用户名: <i>{{username}}</i></div>
            <p>电话: <i>{{telephone}}</i></p>
            <v-btn color="error" dark large @click.stop="dialog = true">修改个人信息</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col md="6">
      <v-card
        class="ml-md-6"
        max-width="450"
        min-width="350"
        style="overflow: hidden;"
        outlined
      >
        <strong style="font-size: 20px;">系统公告</strong>
        <!--分割线-->
        <v-divider></v-divider>
        <ul class="gonggao">
          <li>111111111111111111111111111111111111111111111111111111122222222222</li>
          <li>111111</li>
          <li>111111</li>
          <li>111111</li>
          <li>111111</li>
        </ul>
      </v-card>
    </v-col>
    <v-col md="2">
      <v-img :src="vehicle_adver_img" :lazy-src="vehicle_adver_img"></v-img>
    </v-col>

    <v-dialog
      v-model="dialog"
      max-width="450"
      persistent
    >
      <v-card>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-text-field
            v-model="username"
            label="用户名"
            disabled
          ></v-text-field>

          <!--          <v-uploader @done="uploadDone" ></v-uploader>-->
          <div class="upload clear">
            <span>用户头像</span>
            <vue-core-image-upload
              :class="['btn', 'btn-primary']"
              :crop="false"
              @imageuploaded="imageuploaded"
              :max-file-size="10485760"
              inputOfFile="file"
              compress="50"
              url="apis/management/file/upload">
              <img width="150" height="120" :src="src"/>
            </vue-core-image-upload>
          </div>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="密码"
            required
          ></v-text-field>

          <v-text-field
            v-model="telephone"
            :rules="telephoneRules"
            label="用户电话"
            required
          ></v-text-field>

          <v-distpicker class="mt-4" :province="select.province" :city="select.city" :area="select.area"
                        :placeholders="placeholders" 　@selected="onSelected"></v-distpicker>
          <div class="caption grey--text text--darken-1">
            请选择自己对应的城市地址
          </div>

          <v-btn
            color="success"
            class="mx-auto"
            @click="validate"
          >
            确认修改
          </v-btn>

          <v-btn
            color="#1A237E"
            class="mx-auto"
            @click="closeDiaog"
          >
            取消修改
          </v-btn>

        </v-form>
      </v-card>

    </v-dialog>

  </v-row>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  import VueCoreImageUpload from 'vue-core-image-upload'

  export default {
    name: "userinfo",
    components: {VDistpicker, VueCoreImageUpload},
    data() {
      return {
        vehicle_adver_img: require('../../assets/img/vehicle333.jpg'),
        dialog: false,
        uid: 0,
        username: '123456',
        password: '',
        passwordRules: [
          v => !!v || '密码不能为空',
        ],
        telephone: '',
        telephoneRules: [
          v => !!v || '用户电话不能为空',
          v => /^1(3|4|5|6|7|8|9)\d{9}$/.test(v) || '手机号码格式不规范',
        ],
        //城市选择
        select: {province: '', city: '', area: ''},
        placeholders: {
          province: '------- 省 --------',
          city: '--- 市 ---',
          area: '--- 区 ---',
        },
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        likeWebsite: 0,
        imgUrl:'',
      }
    },
    methods: {
      validate() {
        if (!this.$refs.form.validate()) {
          this.$snackbar.info('请填写完整的信息', "#FF1744");
          return false;
        }
        if (this.select.province === '' || this.select.province === '------- 省 --------') {
          this.$snackbar.info('地址不能为空', "#FF1744");
          return false;
        }
        let user = {
          uid: this.uid,
          username: this.username,
          password: this.password,
          address: this.select.province + this.select.city + this.select.area,
          telephone: this.telephone,
          userImg: this.imgUrl,
          likeWebsite: this.likeWebsite,
        };
        this.$axios.put('apis/login-sms/login/user', user).then(res => {
          console.log(res.data);
          if (res.data.code === 200) {
            this.$snackbar.info('修改成功', '#4DB6AC');
            //刷新组件
            setTimeout(() => {
              this.$router.go(0)
            }, 1500);
          }
        }).catch(err => {
          console.log(err);
        })
      },

      reset() {
        this.$refs.form.reset()
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

      // uploadDone(files){
      //   if(files && Array.isArray(files) && files.length){
      //     // do something...
      //   }
      // },
      imageuploaded(res) {
        console.log(res);
        if (res.code === 200) {
          this.src = "http://" + res.data;
          console.log(this.src);
        }
      },
      closeDiaog() {
        this.dialog = false;
      }
    },
    mounted() {
      this.$axios.get('apis/login-sms/website/user').then(res => {
        this.username = res.data.data.username;
        this.src = this.$fastdfsUrl.fastdfs + res.data.data.userImg;
        this.imgUrl = res.data.data.userImg;
        this.telephone = res.data.data.telephone;
        this.uid = res.data.data.uid;
        this.likeWebsite = res.data.data.likeWebsite;
      }).catch(err => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
  .gonggao {
    height: 150px;
    overflow: hidden;
  }

  .gonggao > li {
    width: 100%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }


  .upload {
    width: 100%;
    border-top: 1px solid #e1e1e1;
    padding: 0.3rem 0;

  span {
    width: 3rem;
    line-height: 0.8rem;
    font-size: 0.42rem;
    float: left;
    padding-left: 0.3rem;
    box-sizing: border-box;
  }

  .btn-primary {
    background-color: #16c2c2;
    color: #fff;
    padding: 0.3rem;
    height: 4rem;
    width: 5rem;
    float: left;

  img {
    width: 100%;
    height: 100%;
  }

  }
  }
  .g-core-image-upload-form {
    width: 100% !important;
    height: 100% !important;
  }
</style>
