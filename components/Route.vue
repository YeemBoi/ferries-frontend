<template>
  <div>
    <div class="d-flex flex-column flex-md-row">
      <v-container v-for="item in items" :key="item.value.id">
        <Terminal v-bind="item" />
      </v-container>
    </div>
    <slot />
    <v-container v-if="route.infoSet">
      <v-simple-table>
        <template #default>
          <tbody>
            <tr
              v-for="item in $items(route.infoSet).filter(filterProperties)"
              :key="item.id"
            >
              <td>
                {{ item.lengthType.toLowerCase() }}
              </td>
              <td>
                <RouteProps
                  v-model="filterChipProps"
                  :route="item"
                  :group-props="{ column: true }"
                  filter
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      required: true,
    },
    setHead: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterChipProps: [],
    }
  },
  head() {
    if (this.setHead) {
      return {
        title: `${this.route.origin.name} to ${this.route.destination.name}`.replaceAll(/\s*\(.*?\)/g, ''),
      }
    }
  },
  computed: {
    items() {
      if (!this.route) {
        return []
      }
      return [
        {
          text: 'Origin',
          value: this.route.origin,
        },
        {
          text: 'Destination',
          value: this.route.destination,
        },
      ]
    },
  },
  methods: {
    filterProperties(item) {
      for (const chipProp of this.filterChipProps) {
        if (!item[chipProp]) {
          return false
        }
      }
      return true
    },
  },
}
</script>

<style>
</style>
