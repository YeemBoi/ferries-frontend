<template>
  <RouteTable :items="allRoutes" :query="$apollo.queries.allRoutes" @click:row="handleRowClick" />
</template>

<script>
import allRoutes from '~/apollo/queries/allRoutes'

export default {
  apollo: {
    allRoutes: {
      prefetch: true,
      query: allRoutes,
    },
  },
  head() {
    return {
      title: 'Routes',
    }
  },
  methods: {
    handleRowClick(_, { item }) {
      this.$router.push(`/routes/${item.origin.code}/${item.destination.code}`)
    },
  },
}
</script>

<style scoped>
.contents-only {
  display: contents;
}
</style>