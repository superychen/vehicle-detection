<template>
  <div>
    <v-app-bar
      color="cyan darken-2"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{user.username}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom v-if="user.showLike === 0">
        <template v-slot:activator="{ on }">
          <v-btn @click="likeWebsite(1)" v-on="on" icon class="d-none d-sm-block">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </template>
        <span>您觉得好,可以给个赞哟!</span>
      </v-tooltip>

      <v-tooltip bottom v-if="user.showLike === 1">
        <template v-slot:activator="{ on }">
          <v-btn @click="likeWebsite(0)" v-on="on" icon class="d-none d-sm-block" color="#F48FB1">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </template>
        <span>非常感谢您的点赞</span>
      </v-tooltip>

      <v-col cols="5" lg="3" md="3" sm="7" xs="8">
        <v-text-field class="" :rules="rules"></v-text-field>
      </v-col>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-avatar color="cyan darken-2" size="48">
        <img
          :src="user.userImg"
          alt="John"
        >
      </v-avatar>
    </v-app-bar>


    <v-sheet
      min-height="500"
      class="overflow-hidden"
      style="position: relative;"
    >
      <!--内容-->
      <v-container>
        <router-view></router-view>
      </v-container>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list-item>
          <v-list-item-avatar style="cursor:pointer;" @click="userInfoRouter">
            <v-img :src="user.userImg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.username}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <router-link tag="div" :to="item.url">{{ item.title }}</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script>
  export default {
    name: "home",
    data: () => ({
      rules: [
        // value => !!value || '输入搜索.',
        value => (value || '').length <= 10 || '最多只能输入10个字符',
      ],
      drawer: null,
      items: [
        {title: '公司情况', icon: 'dashboard', url: '/vehicle'},
        {title: '预约检测', icon: 'question_answer', url: '/appointment'},
        {title: '查看报表', icon: 'mdi-drag-horizontal', url: '/report'},
      ],
      user: {
        username: '',//用户名
        userImg: '',//用户图片
        showLike: 0,
      }
    }),
    methods: {
      likeWebsite(isLike) {
        console.log(isLike);
        this.user.showLike = isLike;
        this.$axios.post('apis/login-sms/website/like', this.$qs.stringify({
          isLike: isLike,
          username: this.user.username,
        })).then(res => {
          if (res.data.data === 1) {
            this.$snackbar.info('感谢您的成功点赞', '#4DB6AC');
            return false;
          }
          if (res.data.data === 0) {
            this.$snackbar.info('你已经取消点赞了', '#FFCC80');
          }
        }).catch(err => {
          console.log(err.response);
        })
      },
      showUserInfo() {
        this.$axios.get('apis/login-sms/website/user').then(res => {
          this.user.username = res.data.data.username;
          this.user.userImg = this.$fastdfsUrl.fastdfs + res.data.data.userImg;
          this.user.showLike = res.data.data.likeWebsite;
        }).catch(err => {
          console.log(err);
        })
      },
      userInfoRouter() {
        this.$router.push({path: '/userinfo'});
      }
    },
    mounted() {
      this.showUserInfo();
    }
  }
</script>

<style scoped>
</style>
