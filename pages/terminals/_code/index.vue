<template>
  <ApolloResult :items="terminal" :query="$apollo.queries.terminal">
    <template #default="terminalItem">
      <v-container>
        <Terminal set-head :value="terminalItem" />
      </v-container>
      <div class="d-flex flex-column flex-md-row">
        <v-container
          v-for="routeType in routeItems(terminalItem)"
          :key="routeType.id"
        >
          <v-simple-table>
            <tbody>
              <v-subheader>{{ routeType.name }}</v-subheader>
              <tr v-for="item in routeType.value" :key="item.id">
                <td>
                  <NuxtLink :to="`/terminals/${item.code}`">{{
                    item.name
                  }}</NuxtLink>
                </td>
                <td>
                  <NuxtLink
                    :to="
                      routeType.id === 'origin'
                        ? `/routes/${item.code}/${terminalItem.code}`
                        : `/routes/${terminalItem.code}/${item.code}`
                    "
                    >View Route</NuxtLink
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-container>
      </div>
    </template>
  </ApolloResult>
</template>

<script>
import terminalFromCode from '~/apollo/queries/terminalFromCode'

export default {
  apollo: {
    terminal: {
      query: terminalFromCode,
      prefetch: ({ route }) => ({
        code: route.params.code,
      }),
      variables() {
        return {
          code: this.$route.params.code,
        }
      },
    },
  },
  methods: {
    routeItems(terminal) {
      return [
        {
          name: 'Departs from:',
          id: 'origin',
          value: this.$items(terminal.originRoutes).map((node) => node.origin),
        },
        {
          name: 'Arrives at:',
          id: 'destination',
          value: this.$items(terminal.destinationRoutes).map(
            (node) => node.destination
          ),
        },
      ]
    },
  },
}
</script>