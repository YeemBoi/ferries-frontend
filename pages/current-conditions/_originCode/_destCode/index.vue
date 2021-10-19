<template>
  <ApolloResult :items="routeInfo" :query="$apollo.queries.routeInfo">
    <template #default="routeInfoItem">
      <Route set-head :route="routeInfoItem.route" />
      <v-container>
        <v-chip-group>
          <RouteProp
            v-for="chipProp in routeprops.filter(
              (chipProp) => routeInfoItem[chipProp.value]
            )"
            :key="chipProp.value"
            v-bind="chipProp"
          />
        </v-chip-group>
      </v-container>
      <div class="d-flex flex-column flex-xl-row">
        <v-container v-for="sailing in sailings" :key="sailing.text">
          <v-subheader
            ><b>{{ sailing.text }}</b></v-subheader
          >
          <v-data-table
            :items="$items(routeInfoItem[sailing.value])"
            :headers="sailing.headers"
          >
            <template #[`item.scheduledTime`]="{ item }">
              <CurrentTime :time="item.scheduledTime" />
            </template>
            <template #[`item.actualTime`]="{ item }">
              <CurrentTime :time="item.actualTime" />
            </template>
            <template #[`item.arrivalTime`]="{ item }">
              <CurrentTime :time="item.arrivalTime" />
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
              <RouteProp
                v-if="item.status"
                v-bind="statuses.find(({ value }) => value === item.status)"
              />
            </template>
            <template #[`item.ferry`]="{ item }">
              <NuxtLink :to="`/ferries/${item.ferry.code}`">{{
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
import routeprops from '~/assets/routeprops.json'

export default {
  data() {
    return {
      routeprops,
      statuses: [
        {
          text: 'On time',
          value: 'GOOD',
          color: 'green',
        },
        {
          text: 'Medical emergency',
          value: 'MEDI',
          color: 'orange',
        },
        {
          text: 'Peak travel; Loading max number of vehicles',
          value: 'PEAK',
          color: 'orange',
        },
        {
          text: 'Loading as many vehicles as possible',
          value: 'VHCL',
          color: 'orange',
        },
        {
          text: 'Earlier loading procedure causing ongoing delay',
          value: 'ONGN',
          color: 'orange',
        },
        {
          text: 'Vessel start up delay, departing ASAP',
          value: 'DELA',
          color: 'orange',
        },
        {
          text: 'Loading and unloading multiple ships',
          value: 'SHIP',
          color: 'orange',
        },
        {
          text: 'Crew member enroute to assist with boarding',
          value: 'CREW',
          color: 'blue',
        },
        {
          text: 'Cancelled',
          value: 'CNCL',
          color: 'red',
        },
        {
          text: 'Helping customers',
          value: 'HELP',
          color: 'blue',
        },
      ],
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