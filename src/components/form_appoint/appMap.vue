<template>
  <div>
    <v-row>
      <v-col md="6">
        <v-text-field
          v-model="keyword"
          :rules="keywordRules"
          label="详细地址"
          placeholder="请填写检测车辆的详细地址"
          required
        ></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field
          v-model="localCity"
          label="地区"
          :disabled="true"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <baidu-map class="bm-view" :center="localCity" :scroll-wheel-zoom="true">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-local-search :panel="false" :select-first-result="true" :keyword="keyword" :auto-viewport="true"
                       :location="localCity"></bm-local-search>
    </baidu-map>

    <v-btn
      color="success"
      class="mr-4 mt-2"
      @click="validate"
    >
      确认
    </v-btn>
  </div>
</template>

<script>
  import getCurrentCityName from "../../getUserLocation";

  export default {
    name: "appMap",
    data() {
      return {
        localCity: '',
        keyword: '',
        keywordRules: [
          v => !!v || '详细地址不能为空',
        ],
      }
    },
    methods: {
      //通过百度地图获取当前城市
      getCurrentCity() {
        getCurrentCityName().then((city) => {
          this.localCity = city;
          console.log(city);  //顺利的话能在控制台打印出当前城市
        });
      },
      //输入正确
      validate() {
        this.$emit('changeStepper',4);
      }
    },
    created() {
      //定位自己的城市
      setTimeout(() => {
        this.getCurrentCity();
      }, 3000);
    }
  }
</script>

<style scoped>
  .bm-view {
    width: 100%;
    height: 300px;
  }
</style>
