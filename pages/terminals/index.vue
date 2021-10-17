<template>
  <ApolloResult :items="allTerminals" :query="$apollo.queries.allTerminals">
    <template #default="terminal">
      <v-container>
        <Terminal :value="terminal" />
      </v-container>
    </template>
  </ApolloResult>
</template>

<script>
import allTerminals from '~/apollo/queries/allTerminals'

export default {
  apollo: {
    allTerminals: {
      prefetch: true,
      query: allTerminals,
    },
  },
}
</script>