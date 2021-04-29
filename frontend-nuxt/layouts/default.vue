// Default layout and style for whole frontend


<template>
<!-- Dark mode across whole app -->
  <v-app dark>
    <!-- Drawer with Imports -->
    <v-navigation-drawer
      color="blue"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="!clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="!clipped"
      fixed
      app
    >
    
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- Menu Slider? -->
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-icon class="pa-2">mdi-shield-lock</v-icon>
      <v-toolbar-title v-text="title"/>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
      <span>&copy; {{ new Date().getFullYear() }} Coiffee
      <v-icon x-large color="blue">mdi-dev-to</v-icon>
      </span>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-script-text-outline',
          title: 'Logs',
          to: '/logs'
        },
        {
          icon: 'mdi-script-text-outline',
          title: 'dummy',
          to: '/dummy'
        },
        {
          icon: 'mdi-script-text-outline',
          title: 'dummy2',
          to: '/dummy2'
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Security Information & Event Manager'
    }
  }
}
</script>
