<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="primary"
        dark
        src="https://picsum.photos/1920/1080?random"
        prominent
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>


      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Bo'sh</v-tab>
          <v-tab>Band</v-tab>
          <v-tab>Hammasi</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
<!--    <v-sheet-->
<!--        id="scrolling-techniques-2"-->
<!--        class="overflow-y-auto"-->
<!--        max-height="600"-->
<!--    >-->
<!--      <v-container style="height: 1000px;"></v-container>-->
<!--    </v-sheet>-->

    <v-navigation-drawer
        app
        v-model="drawer"
        class="drawer"
        color="blue-grey lighten-4"
    >
      <template v-slot:prepend>
        <v-sheet
            color="blue-grey lighten-4"
            class="px-6 justify-center ml-5"
            height="50"
            width="80%"
            dark
        >
          <v-icon x-large color="primary">mdi-chef-hat</v-icon>
          <span style="color: #0a53be" class="brand-text">Play Stationa</span>
        </v-sheet>
      </template>

      <v-divider></v-divider>
      <v-row>
        <v-col class="pt-10">
          <v-list class="pa-0" dense v-for="item in MenuItems" :key="item.title">
            <v-list-item
                v-if="item.visible"
                router
                :to="item.link"
            >
              <v-list-item-icon>
                <v-icon color="blue">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-list dense class="dropdown pa-0">
            <v-list-group
                v-if="item.visible"
                v-for="item in items"
                :key="item.title"
                link
                :to="item.link"
            >
              <template v-slot:activator>
                <v-icon color="blue">{{ item.icon }}</v-icon>
                <v-list-item-content class="ml-8">
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                  v-if="subItem.visible"
                  v-for="subItem in item.items"
                  :key="subItem.title"
                  link
                  :to="subItem.link"

              >
                <v-icon color="blue">{{ subItem.icon }}</v-icon>
                <v-list-item-content class="ml-5">
                  <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>

        </v-col>
      </v-row>

    </v-navigation-drawer>


    <v-main class="ma-1 blue-grey lighten-5">
      <router-view></router-view>
    </v-main>

    <!--    <v-footer app color="transparent" height="72" inset>-->
    <!--      © {{ 2021 }} АО «UzAuto Motors»-->
    <!--    </v-footer>-->
  </v-app>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data: () => ({
    arg: '',
    leng: true,
    locales: [
      {value: `en`, text: `English`},
      {value: `ru`, text: `Русский`},
    ],
    languages: {
      en: `English`,
      ru: `Русский`,
    },
    drawer: null,
    profile: false,
    date: new Date()
  }),
  computed: {

    user() {
      return this.storage.get('user');
    },
    MenuItems() {
      return [
        {
          title: 'Rooms',
          icon: 'mdi-home-analytics',
          link: "/rooms",
          visible: true
        },
        {
          title: 'UserHome',
          icon: 'mdi-home-analytics',
          link: "/userhome",
          visible: true
        }
      ]
    },
    items() {
      return [
        {
          // title: "Settings",
          title: this.$t("settings.settings"),
          icon: "mdi-cog",
          visible: this.$store.getters.checkPermission("settings-index"),
          items: [
            {
              // title: "Users list",
              title: this.$t("user.user_list"),
              icon: "mdi-account-multiple-plus",
              link: "/users",
              visible: this.$store.getters.checkPermission("users-show"),
            },
            {
              // title: "Distribution centers",
              title: this.$t("role.index"),
              icon: "mdi-account-group",
              link: "/roles",
              visible: this.$store.getters.checkPermission("roles-show"),
            },
            {
              // title: "Distribution centers",
              title: this.$t("permission.index"),
              icon: "mdi-account-multiple-check",
              link: "/permissions",
              visible: this.$store.getters.checkPermission("permissions-show"),
            },
          ],
        },
      ];
    }
  },
  methods: {
    en() {
      // this.arg = 'en',
      this.setLocale('ru')
      this.leng = false
    },
    ru() {
      // this.arg = 'ru',
      this.setLocale('en')
      this.leng = true
    },
    setLocale: function (arg) {
      this.$i18n.locale = arg;
      this.$store.dispatch("setLocale", arg);
    },
    logout() {
      this.storage.clear();
      this.$router.push('login')
    }
  }
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(241, 241, 241);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(206, 206, 206);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
}

</style>
