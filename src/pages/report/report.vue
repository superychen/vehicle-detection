<template>
  <v-row no-gutters>
    <v-col v-if="isAppointment === false" class="mx-auto not_appintment mt-12" :cols="12" md="12" lg="12" sm="12">
      您还没有进行任何车辆的检测哟！！
      <div>
        <v-btn class="mx-2 mt-2" @click="toAppointment" depressed large color="#1E88E5">点击预约检测</v-btn>
      </div>
    </v-col>

    <v-col v-else>

      <v-row>
        <v-col :cols="12" md="12" lg="12" sm="12">
          <v-card>
            <v-toolbar
              color="cyan"
              dark
              flat
            >
              <v-toolbar-title>查看结果</v-toolbar-title>
              <template v-slot:extension>
                <v-tabs
                  v-model="tab"
                  align-with-title
                  background-color="transparent"
                >
                  <v-tabs-slider color="yellow"></v-tabs-slider>
                  <v-tab>
                    状态跟踪
                  </v-tab>
                  <v-tab>
                    检测成功
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card v-for="(item,index) in appointList" flat style="float: left;" :key="index">
                  <v-card-text>
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        :elevation="hover ? 12 : 2"
                        height="350"
                        min-width="310"
                        max-width="310"
                      >
                        <v-card-text class="my-0  title">
                          <v-img :src="$fastdfsUrl.fastdfs + item.vehicleInfo.fileNumber.split(',')[0]"></v-img>
                          <p class="mt-2 mb-n1">{{item.vehicleInfo.vehicleNumber}}</p>
                          <p class="mt-1 mb-n1" style="font-size: 12px;color: #999;">{{item.appointTime.replace('T',' ')}}</p>
                          <span class="text-left"
                                v-if="item.appointIsDetection === 0"
                                style="font-size: 12px;color:#fff;background-color:#DCE775;border-color:#32B16C">未检测</span>
                          <span class="text-left"
                                v-if="item.appointIsDetection === 1"
                                style="font-size: 12px;color:#fff;background-color:#32B16C;border-color:#32B16C">检测中</span>
                          <span class="text-left"
                                style="font-size: 12px;color:#fff;background-color:#FF6800;border-color:#32B16C">未加速</span>
                          <div>
                            <div style="float: left;">
                              <span style="font-size: 16px;">已支付:</span><strong style="color: #FF6800;">500元</strong>
                            </div>
                            <div style="float: right;">
                              <v-btn color="info" @click="lookInfo(item)">查看详情</v-btn>
                            </div>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <report_child></report_child>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
      <v-footer padless>
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>汽车检测系统</strong>
        </v-col>
      </v-footer>
    </v-col>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      color="success"
    >
      {{promptMsg}}
    </v-snackbar>

    <v-dialog :persistent="true" v-model="dialog" width="600px">
      <!--      <template v-slot:activator="{ on }">-->
      <!--        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>-->
      <!--      </template>-->
      <v-card>
        <v-card-title>
          <span class="headline">预约车辆详情</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="(item,index) in imgs" md="6" :key="index">
              <v-img :src="$fastdfsUrl.fastdfs + item" style="height: 165px;"></v-img>
            </v-col>
            <v-col md="12" cols="12">
              <v-row>
                <v-col md="6" cols="6">
                  <strong><i>车牌号:&nbsp;</i></strong><span>{{vehicleInfo.info.vehicleNumber}}</span>
                </v-col>
                <v-col md="6" cols="6">
                  <strong><i>车主姓名:&nbsp;</i></strong><span>{{vehicleInfo.info.vehicleUser}}</span>
                </v-col>
                <v-col md="6" cols="6">
                  <strong><i>车主电话:&nbsp;</i></strong><span>{{vehicleInfo.info.vehicleUserTelephone}}</span>
                </v-col>
                <v-col md="6" cols="6">
                  <strong><i>车辆类型:&nbsp;</i></strong><span>{{vehicleInfo.info.vehicleType}}</span>
                </v-col>
                <v-col md="6" cols="6">
                  <strong><i>车辆管理单位:&nbsp;</i></strong><span>{{vehicleInfo.info.vehicleManagement}}</span>
                </v-col>
                <v-col md="6" cols="6">
                  <strong><i>车辆颜色:&nbsp;</i></strong><span>{{vehicleInfo.info.vehicleColor}}</span>
                </v-col>
                <v-col md="12" cols="12">
                  <strong><i>预约地址:&nbsp;</i></strong><span>{{vehicleInfo.appointAddress}}</span>
                </v-col>
                <v-col md="12" cols="12">
                  <strong><i>预约时间:&nbsp;</i></strong><span>{{vehicleInfo.appointTime}}</span>
                </v-col>
              </v-row>

            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>

</template>

<script>
  import report_child from "./report_child";

  export default {
    name: "report",
    components: {
      report_child,
    },
    data() {
      return {
        isAppointment: true, //是否预约
        snackbar: false, //提示框是否弹出
        promptMsg: '',//提示消息
        timeout: 2000, //提示框消失时间
        tab: null,
        appointList: null,
        dialog: false, //打开对话框
        imgs: [],
        vehicleInfo: {
          info: {
            vehicleNumber: '',//车牌号
            vehicleUser: '',//车主姓名
            vehicleUserTelephone: '',//车主电话
            vehicleType: '',//车辆类型
            vehicleManagement: '',//车辆管理单位
            vehicleColor: '',//车辆颜色
          },
          appointAddress: '',//预约地址
          appointTime: '',//预约时间
        },
      }
    },
    methods: {
      //进入预约界面
      toAppointment() {
        this.promptMsg = "您即将进入预约检测流程";
        this.snackbar = true;
        setTimeout(() => {
          this.$router.push({path: '/appointment'})
        }, 1500);
      },
      //查看详情
      lookInfo(val) {
        this.dialog = true;
        this.imgs = val.vehicleInfo.fileNumber.split(',');
        this.$nextTick(() => {
          this.$set(this.vehicleInfo, "info", val.vehicleInfo);
          this.$set(this.vehicleInfo, "appointAddress", val.appointAddress);
          this.$set(this.vehicleInfo, "appointTime", val.appointTime.replace('T', ' '));
        })
      },
    },
    mounted() {
      this.$axios.get('apis/vehicle/appoint/res').then(res => {
        console.log(res.data);
        if (res.data.code === 10086) {
          this.isAppointment = false;
          this.$snackbar.info('您还没有预约过任何车辆呢', '#9E9D24');
        } else if (res.data.code === 200) {
          this.appointList = res.data.data;
        }
      }).catch(err => {
        console.log(err.response);
      })
    }
  }
</script>

<style scoped>
  .not_appintment {
    text-align: center;
  }

</style>
