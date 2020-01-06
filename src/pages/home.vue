<template>
  <div>
    <v-app-bar
      color="cyan darken-2"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>杨晨</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon class="d-none d-sm-block">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </template>
        <span>您觉得好,可以给个赞哟!</span>
      </v-tooltip>

      <v-col cols="5" lg="3" md="3" sm="7" xs="8">
        <v-text-field class="" :rules="rules"></v-text-field>
      </v-col>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-avatar color="cyan darken-2" size="48">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
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
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
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
                <router-link tag="div"  :to="item.url">{{ item.title }}</router-link>
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
        value => {
          // const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (value.indexOf(" ") >= 0 || value.indexOf("　") >= 0) {
            return "不能包含空格";
          }else{
          }
        },
      ],
      drawer: null,
      items: [
        { title: '公司情况', icon: 'dashboard',url:'/vehicle' },
        { title: '预约检测', icon: 'question_answer' ,url:'/appointment'},
        { title: '查看报表', icon: 'mdi-drag-horizontal' ,url:'/report'},
      ],
    }),
  }
</script>

<style scoped>
</style>
