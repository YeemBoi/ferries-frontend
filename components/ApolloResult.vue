<template>
  <div>
    <slot v-if="useAll" :all="nodeItems" :loading="query.loading" />
    <slot v-else-if="query.loading" name="loading"><v-progress-circular indeterminate :size="75" :width="7.5" /></slot>
    <div v-else-if="nodeItems.length">
      <div v-for="node in nodeItems" :key="node.id">
        <slot v-bind="node" />
      </div>
    </div>
    <slot v-else-if="item && item.id" v-bind="item" />
    <slot v-else name="no-results">Not Found :(</slot>
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
    item: {
      type: Object,
      required: false,
      default: () => {},
    },
    query: {
      type: Object,
      required: true,
    },
    useAll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    nodeItems() {
      return this.$items(this.items)
    },
  },
}
</script>