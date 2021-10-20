<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      filled
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
          item-class="class"
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
      if (this.routeAttr) {
        item = item[this.routeAttr]
      }
      item.class = 'cursor-pointer'
      return item
    },
    emitRowClick(item, vals) {
      this.$emit('click:row', item, vals)
    }
  },
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>