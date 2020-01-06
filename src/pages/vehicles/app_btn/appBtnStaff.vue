<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-2 mt-2" v-on="on" depressed large color="#448AFF">员工简介</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>员工简介</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">保存</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-sheet
        class="mx-auto"
        elevation="8"
        max-width="800"
      >
        <v-slide-group
          v-model="model"
          class="pa-4"
          show-arrows
        >
          <v-slide-item
            v-for="(item,n) in staffInfo"
            :key="n"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              :color="active ? '#B39DDB' : 'grey lighten-1'"
              class="ma-4"
              height="300"
              width="180"
              @click="toggle"
            >
              <v-img :src="item.staffinfoImg"  v-if="active !== true" width="180px" height="300px"></v-img>
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <v-scale-transition>
                  <v-icon
                    v-if="active"
                    color="white"
                    size="48"
                    v-text="'mdi-account-multiple-check'"
                  ></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <v-expand-transition>
          <v-sheet
            v-if="model != null"
            color="grey lighten-4"
            height="200"
            tile
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div>
                <i>员工姓名:&nbsp;</i><strong>{{staffInfo[model].staffinfoName}}</strong>
              </div>
              <div></div>
              <p style="width: 90%;"><strong>员工简介:&nbsp;</strong>{{staffInfo[model].staffinfoIntroduce}}</p>
              <div>
                <span>点个赞再走吧</span>
                <v-rating
                  v-model="staffInfo[model].staffRating"
                  background-color="orange lighten-3"
                  color="orange"
                ></v-rating>
              </div>
            </v-row>
          </v-sheet>
        </v-expand-transition>
      </v-sheet>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "appBtnStaff",
    data() {
      return {
        dialog: false,
        model: null,
        staffInfo: [{
          staffinfoImg: require('../../../assets/img/yuangong1.jpg'),
          staffinfoName: '刘德华',
          staffinfoIntroduce: '刘德华，香港著名男演员、歌手，1961年9月27日出生于香港新界大埔镇泰亨村，毕业于香港可立中学及第十期无线艺员训练班。他是香港乐坛90年代的“四大天王”之一（其他三位分别是郭富城、张学友、黎明），也是吉尼斯世界纪录大全中获奖最多的香港歌手。',
          staffRating: 0,
        },{
          staffinfoImg: require('../../../assets/img/yuangong2.jpg'),
          staffinfoName: '周润发',
          staffinfoIntroduce: '周润发，香港著名男演员、歌手，1961年9月27日出生于香港新界大埔镇泰亨村，毕业于香港可立中学及第十期无线艺员训练班。他是香港乐坛90年代的“四大天王”之一（其他三位分别是郭富城、张学友、黎明），也是吉尼斯世界纪录大全中获奖最多的香港歌手。',
          staffRatingx: 4,
        }],

      }
    },
    methods: {

    },
  }
</script>

<style scoped>

</style>
