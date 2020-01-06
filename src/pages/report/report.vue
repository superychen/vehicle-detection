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
                <v-card flat style="float: left;">
                  <v-card-text>
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        :elevation="hover ? 12 : 2"
                        height="350"
                        min-width="310"
                        max-width="310"
                      >
                        <v-card-text class="my-0  title">
                          <v-img :src="imgUrl"></v-img>
                          <p class="mt-2 mb-n1">路虎四号</p>
                          <p class="mt-1 mb-n1" style="font-size: 12px;color: #999;">2019-12-12</p>
                          <span class="text-left" style="font-size: 12px;color:#fff;background-color:#32B16C;border-color:#32B16C">未检测</span>
                          <span class="text-left" style="font-size: 12px;color:#fff;background-color:#FF6800;border-color:#32B16C">未加速</span>
                          <div >
                            <div style="float: left;">
                              <span style="font-size: 16px;">已支付:</span><strong style="color: #FF6800;">500元</strong>
                            </div>
                            <div style="float: right;"><v-btn color="info">查看详情</v-btn></div>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                  </v-card-text>
                </v-card>
                <v-card flat style="float: left;">
                  <v-card-text>
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        :elevation="hover ? 12 : 2"
                        height="350"
                        min-width="310"
                        max-width="310"
                      >
                        <v-card-text class="my-0  title">
                          <v-img :src="imgUrl"></v-img>
                          <p class="mt-2 mb-n1">路虎四号</p>
                          <p class="mt-1 mb-n1" style="font-size: 12px;color: #999;">2019-12-12</p>
                          <span class="text-left" style="font-size: 12px;color:#fff;background-color:#32B16C;border-color:#32B16C">未检测</span>
                          <span class="text-left" style="font-size: 12px;color:#fff;background-color:#FF6800;border-color:#32B16C">未加速</span>
                          <div >
                            <div style="float: left;">
                              <span style="font-size: 16px;">已支付:</span><strong style="color: #FF6800;">500元</strong>
                            </div>
                            <div style="float: right;"><v-btn color="info">查看详情</v-btn></div>
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
  </v-row>

</template>

<script>
  import report_child from "./report_child";
  export default {
    name: "report",
    components: {
      report_child
    },
    data() {
      return {
        isAppointment: true, //是否预约
        snackbar: false, //提示框是否弹出
        promptMsg: '',//提示消息
        timeout: 2000, //提示框消失时间
        tab: null,
        imgUrl: require('../../assets/img/not_jiance_1.jpg'),
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
    },
  }
</script>

<style scoped>
  .not_appintment {
    text-align: center;
  }

</style>
