<template>
  <RouteTable
    route-attr="route"
    :items="allRouteInfo"
    :query="$apollo.queries.allRouteInfo"
    @click:row="handleRowClick"
  />
</template>

<script>
import allCCRoutes from '~/apollo/queries/allCCRoutes'

export default {
  apollo: {
    allRouteInfo: {
      prefetch: true,
      query: allCCRoutes,
    },
  },
  head() {
    return {
      title: 'Current Conditions',
    }
  },
  methods: {
    handleRowClick(_, { item }) {
      this.$router.push(
        `/current-conditions/${item.origin.code}/${item.destination.code}`
      )
    },
  },
}
</script>

<style scoped>
.contents-only {
  display: contents;
}
</style>