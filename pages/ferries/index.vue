<template>
  <div>
    <v-text-field
      v-model="searchText"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <ApolloResult :items="allFerries" :query="$apollo.queries.allFerries" use-all>
      <template #default="ferryItems">
        <v-data-table
          :items="ferryItems.all"
          :footer-props="{
            itemsPerPageOptions: [-1, 10, 25, 50],
          }"
          :search="search"
          :loading="ferryItems.loading"
          :headers="headers"
        >
          <template #[`item.name`]="{ item }">
            <NuxtLink :to="`/ferries/${item.code}`">
              {{ item.name }}
            </NuxtLink>
          </template>
          <template #[`item.services`]="{ item }">
            <v-chip-group v-model="services" column multiple>
              <v-chip
                v-for="service in item.services.edges.map(
                  (service) => service.node
                )"
                :key="service.id"
                :value="service.name.toLowerCase()"
                :color="pickColor(service.name)"
                filter
              >
                {{ service.name }}
              </v-chip>
            </v-chip-group>
          </template>
        </v-data-table>
      </template>
    </ApolloResult>
  </div>
</template>

<script>
import allFerries from '~/apollo/queries/allFerries'

export default {
  apollo: {
    allFerries: {
      prefetch: true,
      query: allFerries,
    },
  },
  data() {
    return {
      searchText: '',
      services: [],
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Car capacity',
          value: 'carCapacity',
        },
        {
          text: 'Human capacity',
          value: 'humanCapacity',
        },
        {
          text: 'Horsepower',
          value: 'carCapacity',
        },
        {
          text: 'Length (m)',
          value: 'totalLength',
        },
        {
          text: 'Max speed (knots)',
          value: 'maxSpeed',
        },
        {
          text: 'Main amenities',
          value: 'services',
          sortable: false,
          width: '40%',
          filter: this.filterService,
        },
      ],
    }
  },
  head() {
    return {
      title: 'Ships',
    }
  },
  computed: {
    search() {
      return this.searchText
    },
  },
  methods: {
    hashCode(str) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }
      return hash
    },
    pickColor(str) {
      return `hsl(${this.hashCode(str) % 360}, 75%, 40%)`
    },
    filterService(_value, _search, item) {
      const services = item.services.edges.map((service) =>
        service.node.name.toLowerCase()
      )
      for (const service of this.services) {
        if (!services.includes(service)) {
          return false
        }
      }
      return true
    },
  },
}
</script>