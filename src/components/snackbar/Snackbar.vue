<template>
  <v-snackbar v-model="open"
              :color="color"
              :timeout="timeout"
              top
              style="text-align: center;"
              >
    {{ mes }}
  </v-snackbar>
</template>

<script>
  export default {
    name: "Snackbar",
    props: [],
    data() {
      return {
        icon: "",
        timeout:2000,
        //提示框显示时间为2秒
        color: "#D4E157",
        open: false,
        mes: '',
      };
    },
    created() {
    },
    methods: {
      info(mes,color) {
        this.mes = mes;
        this.open=true;
        this.color=color;
      },
    }
  }
</script>

<style scoped lang='scss'>
  .v-snack {
    .v-snack__content {
      justify-content: flex-start;

      i {
        margin-right: 10px;
      }
    }
  }
</style>
