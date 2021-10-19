<template>
  <ApolloResult :items="route" :query="$apollo.queries.route">
    <template #default="routeItem">
      <Route set-head :route="routeItem">
        <div class="d-flex flex-column flex-md-row">
          <div class="mr-auto">
            <v-container>
              <v-date-picker v-model="pickedDate" />
            </v-container>
          </div>
          <v-container class="align-self-stretch">
            <client-only>
              <ApolloResult
                :items="scheduledSailings"
                use-all
                :query="$apollo.queries.scheduledSailings"
              >
                <template #default="sailings">
                  <v-data-table
                    :items="sailings.all"
                    :loading="sailings.loading"
                    :headers="scheduledHeaders"
                  >
                    <template #[`item.time`]="{ item }">
                      <TimeOfDay :time="item.time" />
                    </template>
                    <template #[`item.sailing.duration`]="{ item }">
                      {{ item.sailing.duration.replace(/:00(?!.*:00)/, '') }}
                    </template>
                    <template #[`item.sailing.stops`]="{ item }">
                      <ul v-if="item.sailing.stops.edges.length">
                        <li
                          v-for="stop in $items(item.sailing.stops)"
                          :key="stop.id"
                        >
                          {{
                            stop.isTransfer ? 'Transfer at' : 'Stop at'
                          }}&nbsp;
                          <NuxtLink :to="`/terminals/${stop.terminal.code}`">{{
                            stop.terminal.name
                          }}</NuxtLink>
                          <span v-if="!stop.isCertain">&nbsp; (?)</span>
                        </li>
                      </ul>
                      <span v-else>Direct sailing</span>
                    </template>
                    <template #[`item.sailing.officialPage`]="{ item }">
                      <ExtLink :to="item.sailing.officialPage"
                        >Official Page</ExtLink
                      >
                    </template>
                  </v-data-table>
                </template>
              </ApolloResult>
            </client-only>
          </v-container>
        </div>
      </Route>
    </template>
  </ApolloResult>
</template>

<script>
import routeFromCodes from '~/apollo/queries/routeFromCodes'
import scheduledSailingFromCodes from '~/apollo/queries/scheduledSailingFromCodes'

export default {
  data() {
    return {
      pickedDate: this.$now().toISOString().substr(0, 10),
      scheduledHeaders: [
        {
          text: 'Time',
          value: 'time',
        },
        {
          text: 'Duration',
          value: 'sailing.duration',
        },
        {
          text: 'Stops & transfers',
          value: 'sailing.stops',
        },
        {
          text: 'Official page',
          value: 'sailing.officialPage',
        },
        {
          text: 'Time fetched',
          value: 'sailing.fetchedTime',
        },
      ],
    }
  },
  apollo: {
    route: {
      query: routeFromCodes,
      prefetch: ({ route }) => ({
        originCode: route.params.originCode,
        destCode: route.params.destCode,
      }),
      variables() {
        return {
          originCode: this.$route.params.originCode,
          destCode: this.$route.params.destCode,
        }
      },
    },
    scheduledSailings: {
      query: scheduledSailingFromCodes,
      prefetch: false,
      variables() {
        return {
          originCode: this.$route.params.originCode,
          destCode: this.$route.params.destCode,
          date: new Date(this.pickedDate).toISOString(),
        }
      },
    },
  },
}
</script>