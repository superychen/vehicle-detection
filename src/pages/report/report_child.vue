<template>
  <v-row>
    <v-col class="d-none d-lg-block" md="3" lg="3">
      <v-img class="mt-3" :src="imgUrl" height="410"></v-img>
    </v-col>
    <v-col v-if="!isShow" md="9" lg="9" :cols="12">
      <v-card flat style="float: left;">
        <v-card-text>
          目前还没有检测成功的结果哟!!
        </v-card-text>
      </v-card>
    </v-col>

    <v-col v-if="isShow" md="9" lg="9" :cols="12">
      <v-card v-for="(item,index) in resData" :key="index" flat style="float: left;">
        <v-card-text>
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              height="200"
              min-width="220"
              max-width="220"
            >
              <v-card-text class="my-0  title text-center">
                <p class="mt-2 mb-n1">{{item.appointment.vehicleInfo.vehicleNumber}}</p>
                <p class="mt-1 mb-n1" style="font-size: 12px;color: #999;">受检时间:</p>
                <p style="font-size: 12px;">{{item.appointment.appointTime.split('T')[0]}}&nbsp;<i>至</i>&nbsp;
                  {{item.resultTime.split('T')[0]}}</p>
                <v-btn color="#26C6DA"
                       @click="exportOneReport(item.resultContent, item.appointment.vehicleInfo.vehicleNumber)">导出报表
                </v-btn>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-card-text>
      </v-card>
    </v-col>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn class="ma-2 toExcel" color="success" @click="exportAllReport" v-on="on" fab x-large dark>
          <v-icon>mdi-file-document-box-outline</v-icon>
        </v-btn>
      </template>
      <span>全部导出为excel</span>
    </v-tooltip>
    <v-col :cols="12" lg="12" md="12">
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="pageLength"
          :total-visible="7"
          @input="pageLoad"
          circle
        ></v-pagination>
      </div>
    </v-col>

    <v-dialog
      v-model="dialog"
      max-width="60%"
      persistent
    >
      <v-card>
        <v-card-title>
          {{dialogName}}
        </v-card-title>
        <v-card-text>
          是否确定导出报表
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
            color="primary"
            @click="subReport"
          >
            导出
          </v-btn>
          <!--          <a href="apis/vehicle/vehicle/report" >下载</a>-->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: "report_child",
    data() {
      return {
        imgUrl: require('../../assets/img/finance-1806f8ca.png'),
        page: 1,//分页
        resData: [],
        pageLength: 1,
        isShow: false,
        dialog: false, //对话框
        dialogName: '',//对话框的标题
        resContent: [], //这个数据是点击导出报表之后才传递的参数
      }
    },
    methods: {
      pageLoad() {
        this.initLoad();
      },
      //初始化结果数据
      initLoad() {
        this.$axios.get('apis/vehicle/vehicle/result', {
          params: {
            pageNo: this.page,
            pageSize: 6,
          }
        }).then(res => {
          console.log(res.data);
          if (res.data.code === 200) {
            this.isShow = true;
            this.resData = res.data.data.records;
            this.pageLength = Math.ceil(res.data.data.total / 6);
          } else if (res.data.code === 500) {
            this.isShow = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //导出单个报表
      exportOneReport(msg, vehicleName) {
        let resContent = JSON.parse(msg);
        this.resContent = resContent;
        this.dialogName = vehicleName;
        this.dialog = true;
      },
      //导出报表，向后台传值
      subReport() {
        let config = {
          headers: {'Content-Type': 'application/json'},
          responseType: 'blob',
        };
        this.$axios.post('apis/vehicle/vehicle/res/report?vehicleNumber=' + this.dialogName, this.resContent, config).then(res => {
          this.$snackbar.info('导出成功!!!', '#42A5F5');
          this.dialog = false;
          let blob = new Blob([res.data]); //创建一个blob对象
          let a = document.createElement('a'); //创建一个<a></a>标签
          a.href = URL.createObjectURL(blob); // response is a blob
          a.download = this.dialogName + ".xlsx";  //文件名称
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }).catch(err => {
          console.log(err);
        });
      },
      exportAllReport() {
        let config = {
          responseType: 'blob',
        };
        this.$axios.get('apis/vehicle/vehicle/report', config).then(res => {
          this.$snackbar.info('导出成功!!!', '#42A5F5');
          let blob = new Blob([res.data]); //创建一个blob对象
          let a = document.createElement('a'); //创建一个<a></a>标签
          a.href = URL.createObjectURL(blob); // response is a blob
          a.download = this.$Cookies.get('username') + ".xlsx";  //文件名称
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }).catch(err => {
          console.log(err);
        })
      },
    },

    mounted() {
      this.initLoad();
    }
  }
</script>

<style scoped>
  .toExcel {
    position: fixed;
    top: 40%;
    right: 11%;
  }
</style>
