<template>
  <div>
    <v-dialog v-model="dialog" width="700px">
      <template v-slot:activator="{ on }">
        <v-btn class="mx-2 mt-2" v-on="on" depressed large :color="color">{{appBtnTitle}}</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{appBtnTitle}}</span>
        </v-card-title>
        <v-card-text>
          <app-step @closeDia="closeDia"></app-step>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import appStep from "./appStep";

  export default {
    name: "app_btn",
    components: {appStep},
    props:['appBtnTitle','color'],
    data() {
      return {
        dialog: false,
      }
    },
    methods: {
      closeDia() {
        //关闭对话框
        this.dialog = false;
      }
    }
  }
</script>

<style scoped>

</style>
