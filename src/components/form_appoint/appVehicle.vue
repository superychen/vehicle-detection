<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-file-input  type="file" @change="changeimg" multiple　accept="image/*" show-size label="上传车辆图片(可上传多个)"></v-file-input>

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
      v-model="vehicleModel"
      :rules="vehicleModelRules"
      label="车辆型号"
      required
    ></v-text-field>

    <v-text-field
      v-model="vehicleBrand"
      :rules="vehicleBrandRules"
      label="车辆品牌"
      required
    ></v-text-field>

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
    data: () => ({
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
      vehicleName:'',
      vehicleNameRules:[
        v => !!v || '车主姓名不能为空',
      ],
    }),

    methods: {
      validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.$emit('changeStepper',3);
        }
      },
      reset() {
        this.$refs.form.reset()
      },
      changeimg(file) {
        // let formData = new FormData()
        formData.delete("files");
        for (let i = 0; i < file.length; i++) {
          formData.append('files', file[i]);
        }
        console.log(formData.getAll("files"));
        // let headers = {
        //   'Content-Type': 'multipart/form-data'
        // };
        // this.$axios.post('http://localhost:10089/upload/file', formData, {headers: headers}).then(res => {
        //   console.log(res.data);
        // }).catch(err => {
        //   console.log(err.response);
        // });
      }
    },
  }
</script>

<style scoped>

</style>
