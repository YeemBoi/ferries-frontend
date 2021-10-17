<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="true"
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
    <v-app-bar :clipped-left="true" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-map-marker-path',
          title: 'Routes & Schedules',
          to: '/routes',
        },
        {
          icon: 'mdi-map-clock',
          title: 'Current Conditions',
          to: '/current-conditions',
        },
        {
          icon: 'mdi-ferry',
          title: 'Ferries',
          to: '/ferries',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'About',
          to: '/',
        },
      ],
      title: 'BC Ferries (Unofficial)',
    }
  },
}
</script>
