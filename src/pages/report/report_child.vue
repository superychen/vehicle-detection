<template>
    <v-row>
      <v-col class="d-none d-lg-block" md="3" lg="3">
        <v-img class="mt-3" :src="imgUrl" height="410"></v-img>
      </v-col>
      <v-col  md="9" lg="9" :cols="12">
        <v-card flat style="float: left;">
          <v-card-text>
            <v-hover v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                height="200"
                min-width="220"
                max-width="220"
              >
                <v-card-text class="my-0  title text-center">
                  <p class="mt-2 mb-n1">路虎四号</p>
                  <p class="mt-1 mb-n1" style="font-size: 12px;color: #999;">受检时间:</p>
                  <p style="font-size: 12px;">2019-12-12&nbsp;<i>至</i>&nbsp;2019-12-30</p>
                  <v-btn color="#26C6DA">查看详情</v-btn>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-card-text>
        </v-card>
      </v-col>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="ma-2 toExcel" color="success" v-on="on"  fab x-large dark>
            <v-icon>mdi-file-document-box-outline</v-icon>
          </v-btn>
        </template>
        <span>全部导出为excel</span>
      </v-tooltip>
      <v-col :cols="12" lg="12" md="12">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="20"
            :total-visible="7"
            circle
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
</template>

<script>
  export default {
    name: "report_child",
    data(){
      return{
        imgUrl:require('../../assets/img/finance-1806f8ca.png'),
        page: 1,//分页
      }
    },
  }
</script>

<style scoped>
  .toExcel{
    position: fixed;
    top: 40%;
    right: 11%;
  }
</style>
