<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="index of steps.stepTotal">
          <v-stepper-step :complete="e1 > index" :step="index">第{{index}}步</v-stepper-step>
          <v-divider v-show="index !== steps.stepTotal"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="index of steps.stepTotal" :step="index" :key="index">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            min-height="300px"
          ></v-card>
          <v-btn
            color="primary"
            @click="nextStep(index)"
          >
            下一步
          </v-btn>
          <v-btn text @click="closeParentDia">取消</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
  export default {
    name: "appStep",
    data() {
      return {
        e1: 0,//步骤条完成标志
        steps: {
          stepTotal: 3,
        },
      }
    },
    methods: {
      nextStep(index) {
        if (index < this.steps.stepTotal) {
          this.e1 = index + 1;
        } else {
          this.e1 = 1;
        }
      },
      //关闭对话框
      closeParentDia() {
        this.$emit('closeDia')
      },
    },
    //在对话框被创建时
    created() {
      console.log("111")
    }
  }
</script>

<style scoped>

</style>
