<template>
  <div>
    <v-container>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        filled
      ></v-text-field>
    </v-container>
    <ApolloResult :items="allTerminals" :query="$apollo.queries.allTerminals">
      <template #default="terminal">
        <v-container
          v-if="
            !search.length ||
            terminal.name.toLowerCase().includes(cleanSearch) ||
            terminal.code.toLowerCase() === cleanSearch
          "
        >
          <Terminal :value="terminal" />
        </v-container>
      </template>
    </ApolloResult>
  </div>
</template>

<script>
import allTerminals from '~/apollo/queries/allTerminals'

export default {
  data() {
    return {
      search: '',
    }
  },
  apollo: {
    allTerminals: {
      prefetch: true,
      query: allTerminals,
    },
  },
  computed: {
    cleanSearch() {
      return this.search.trim().toLowerCase()
    },
  },
}
</script>