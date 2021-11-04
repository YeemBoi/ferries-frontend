<template>
  <ApolloResult :items="routeInfo" :query="$apollo.queries.routeInfo">
    <template #default="routeInfoItem">
      <Route set-head :route="routeInfoItem.route" />
      <v-container>
        <RouteProps :route="routeInfo" />
      </v-container>
      <div class="d-flex flex-column flex-xl-row">
        <v-container v-for="sailing in sailings" :key="sailing.text">
          <v-subheader
            ><b>{{ sailing.text }}</b></v-subheader
          >
          <v-data-table
            :items="$items(routeInfoItem[sailing.value])"
            :headers="sailing.headers"
            sort-by="scheduledTime"
          >
            <template #[`item.scheduledTime`]="{ item }">
              <TimeOfDay check-tmrw :time="item.scheduledTime" />
            </template>
            <template #[`item.actualTime`]="{ item }">
              <TimeOfDay :time="item.actualTime" />
            </template>
            <template #[`item.arrivalTime`]="{ item }">
              <TimeOfDay check-tmrw :time="item.arrivalTime" />
            </template>
            <template #[`item.totalCapacityPercentage`]="{ item }">
              {{ item.totalCapacityPercentage }}%
            </template>
            <template #[`item.standardVehiclePercentage`]="{ item }">
              {{ item.standardVehiclePercentage }}%
            </template>
            <template #[`item.mixedVehiclePercentage`]="{ item }">
              {{ item.mixedVehiclePercentage }}%
            </template>
            <template #[`item.status`]="{ item }">
              <SailingStatus v-if="item.status" :code="item.status" />
            </template>
            <template #[`item.officialPage`]="{ item }">
              <ExtLink v-if="item.officialPage" :to="item.officialPage"
                >Official page</ExtLink
              >
            </template>
            <template #[`item.ferry`]="{ item }">
              <NuxtLink v-if="item.ferry" :to="`/ferries/${item.ferry.code}`">{{
                item.ferry.name
              }}</NuxtLink>
            </template>
          </v-data-table>
        </v-container>
      </div>
    </template>
  </ApolloResult>
</template>

<script>
import CCRouteFromCode from '~/apollo/queries/CCRouteFromCode'
export default {
  data() {
    return {
      sailings: [
        {
          text: 'Upcoming',
          value: 'futureSailings',
          headers: [
            {
              text: 'Scheduled Time',
              value: 'scheduledTime',
            },
            {
              text: 'ETA',
              value: 'arrivalTime',
            },
            {
              text: 'Capacity',
              value: 'totalCapacityPercentage',
            },
            {
              text: 'Capacity (standard vehicles)',
              value: 'standardVehiclePercentage',
              width: '5%',
            },
            {
              text: 'Capacity (special vehicles)',
              value: 'mixedVehiclePercentage',
              width: '5%',
            },
            {
              text: 'Status',
              value: 'status',
            },
            {
              text: 'Ferry',
              value: 'ferry',
            },
            {
              text: 'Official page',
              value: 'officialPage',
              sortable: false,
            },
            {
              text: 'Last updated',
              value: 'fetchedTime',
            },
          ],
        },
        {
          text: 'Arrived',
          value: 'pastSailings',
          headers: [
            {
              text: 'Scheduled Time',
              value: 'scheduledTime',
            },
            {
              text: 'Actual Time',
              value: 'actualTime',
            },
            {
              text: 'Arrival Time',
              value: 'arrivalTime',
            },
            {
              text: 'Status',
              value: 'status',
            },
            {
              text: 'Ferry',
              value: 'ferry',
            },
            {
              text: 'Official page',
              value: 'officialPage',
              sortable: false,
            },
            {
              text: 'Last updated',
              value: 'fetchedTime',
            },
          ],
        },
      ],
    }
  },
  apollo: {
    routeInfo: {
      query: CCRouteFromCode,
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
  },
}
</script>
