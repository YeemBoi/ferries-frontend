<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <ApolloResult :items="items" use-all :query="query">
      <template #default="routes">
        <v-data-table
          :items="routes.all.map(getRoute)"
          :loading="routes.loading"
          :headers="headers"
          :items-per-page="-1"
          :search="search"
          @click:row="emitRowClick"
        />
      </template>
    </ApolloResult>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Object,
      required: false,
      default: () => {},
    },
    query: {
      type: Object,
      required: true,
    },
    routeAttr: {
      type: String,
      required: false,
      default: null,
    },
  },
  emits: ['click:row'],
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Origin',
          value: 'origin.name',
        },
        {
          text: 'Destination',
          value: 'destination.name',
        },
      ],
    }
  },
  methods: {
    getRoute(item) {
      if (!this.routeAttr) {
        return item
      }
      return item[this.routeAttr]
    },
    emitRowClick(item, vals) {
      this.$emit('click:row', item, vals)
    }
  },
}
</script>

<style scoped>
.contents-only {
  display: contents;
}
</style>