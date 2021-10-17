<template>
  <ApolloResult :items="ferry" :query="$apollo.queries.ferry">
    <template #default="item">
      <v-card>
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-subtitle>Code: {{ item.code }}</v-card-subtitle>
        <v-card-text>
          <div class="d-flex flex-column flex-lg-row">
            <v-container width="50%">
              <div v-if="item.built">
                Built in {{ new Date(item.built).getFullYear() }}
              </div>
              <div>
                Capacity: {{ item.carCapacity }} cars,
                {{ item.humanCapacity }} people
              </div>
              <div>Horsepower: {{ item.horsepower }}hp</div>
              <div>Maximum displacement: {{ item.maxDisplacement }}t</div>
              <div>Maximum speed: {{ item.maxDisplacement }} knots</div>
              <div>Overall length: {{ item.totalLength }}m</div>
              <div>Last updated: {{ item.fetchedTime }}m</div>
            </v-container>
            <v-container>
              <div v-for="amenities in services(item)" :key="amenities.name">
                <b>{{ amenities.text }}:</b>
                <v-chip-group>
                  <v-chip
                    v-for="amenity in $items(amenities.value)"
                    :key="amenity.id"
                  >
                    {{ amenity.name }}
                  </v-chip>
                </v-chip-group>
              </div>
            </v-container>
          </div>
        </v-card-text>
        <v-card-actions v-if="item.officialPage">
          <ExtLink :to="item.officialPage">Official Page</ExtLink>
        </v-card-actions>
      </v-card>
    </template>
  </ApolloResult>
</template>

<script>
import ferryFromCode from '~/apollo/queries/ferryFromCode'

export default {
  apollo: {
    ferry: {
      query: ferryFromCode,
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
  head() {
    return {
      title: this.$items(this.ferry).length
        ? this.$items(this.ferry)[0].name
        : 'Not Found',
    }
  },
  methods: {
    services(ferry) {
      return [
        { text: 'Main amenities', value: ferry.mainAmenities },
        { text: 'Additional', value: ferry.services },
      ]
    },
  },
}
</script>