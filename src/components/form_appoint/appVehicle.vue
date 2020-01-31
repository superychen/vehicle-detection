<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-file-input type="file" @change="changeimg" multiple　accept="image/*" show-size
                  label="上传车辆图片(可上传多个)"></v-file-input>

    <v-text-field
      v-model="vehicleName"
      :rules="vehicleNameRules"
      label="车主姓名"
      required
    ></v-text-field>

    <v-text-field
      v-model="vehicleNum"
      :counter="8"
      :rules="vehicleNumRules"
      label="车牌号"
      required
    ></v-text-field>

    <v-text-field
      v-model="vehicleManagement"
      :rules="vehicleManagementRules"
      label="车辆管理单位"
      required
    ></v-text-field>

    <v-text-field
      v-model="vehicleModel"
      :rules="vehicleModelRules"
      label="车辆型号"
      required
    ></v-text-field>

    <v-text-field
      v-model="vehicleColor"
      :rules="vehicleColorRules"
      label="车辆颜色"
      required
    ></v-text-field>

    <v-text-field
      v-model="vehicleBrand"
      :rules="vehicleBrandRules"
      label="车辆品牌"
      required
    ></v-text-field>

    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateFormatted"
          label="填写时间"
          persistent-hint
          prepend-icon="event"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
    </v-menu>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      确认
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      重置
    </v-btn>

  </v-form>
</template>

<script>
  let formData = new FormData();
  export default {
    name: "appVehicle",
    data: vm => ({
      valid: true,
      vehicleNum: '', //车牌号
      vehicleNumRules: [
        v => !!v || '车牌号不能为空',
        v => (v && v.length === 8) || '车牌号格式不正确',
      ],
      vehicleModel: '',
      vehicleModelRules: [
        v => !!v || '车辆型号不能为空',
      ],
      vehicleBrand: '',
      vehicleBrandRules: [
        v => !!v || '车辆品牌不能为空',
      ],
      vehicleName: '',
      vehicleNameRules: [
        v => !!v || '车主姓名不能为空',
      ],
      vehicleManagement: '',
      vehicleManagementRules: [
        v => !!v || '车辆管理单位不能为空',
      ],
      vehicleColor: '',
      vehicleColorRules: [
        v => !!v || '车辆颜色不能为空'
      ],
      menu1: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      fileStr: '', //上传车辆文件后得到的文件名称,用逗号隔开
    }),

    computed: {
      computedDateFormatted() {
        return this.formatDate(this.date)
      },
    },
    methods: {
      validate() {
        if (!this.$refs.form.validate()) {
          return false;
        }
        if (this.fileStr === '') {
          this.$snackbar.info('您必须选择汽车的照片', '#EF5350');
          return false;
        }
        let vehicleInfo = {
          vehicleManagement: this.vehicleManagement,
          fileNumber: this.fileStr,
          vehicleUser: this.vehicleName,
          vehicleNumber: this.vehicleNum,//车牌号
          vehicleType: this.vehicleModel, //车辆型号
          vehicleColor: this.vehicleColor, //车辆颜色
          systemType: this.vehicleBrand, //车辆品牌
          vehicleDate: this.dateFormatted, //车辆信息填写日期
        };
        this.$emit('vehicleRes', vehicleInfo);
        // this.$emit('changeStepper', 3);
      },
      reset() {
        this.$refs.form.reset()
      },
      changeimg(file) {
        // let formData = new FormData()
        formData.delete("file");
        for (let i = 0; i < file.length; i++) {
          formData.append('file', file[i]);
        }
        console.log(formData.getAll("file"));
        let headers = {
          'Content-Type': 'multipart/form-data'
        };
        this.$axios.post('apis/management/file/upload', formData, {headers: headers}).then(res => {
          console.log(res.data);
          if (res.data.code === 200) {
            let fileStr = "";
            for (let i = 0; i < res.data.data.length; i++) {
              if (i !== res.data.data.length - 1) {
                fileStr = fileStr + res.data.data[i] + ",";
              } else {
                fileStr = fileStr + res.data.data[i];
              }
            }
            this.fileStr = fileStr;
          }
        }).catch(err => {
          console.log(err.response);
        });
      },
      //转换时间
      formatDate(date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${year}-${month}-${day}`
      },
      parseDate(date) {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

    },
    watch: {
      date(val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
  }
</script>

<style scoped>

</style>
