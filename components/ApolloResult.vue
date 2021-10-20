<template>
  <div>
    <slot v-if="useAll" :all="nodeItems" :loading="isLoading" />
    <slot v-else-if="isLoading" name="loading"
      ><v-progress-circular
        v-if="!useAll"
        indeterminate
        :size="75"
        :width="7.5"
    /></slot>
    <div v-else-if="nodeItems.length">
      <div v-for="node in nodeItems" :key="node.id">
        <slot v-bind="node" />
      </div>
    </div>
    <slot v-else-if="query.loading" name="loading"></slot>
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
    isLoading() {
      const isLoading = Boolean(this.query && this.query.loading)
      if (!this.useAll) {
        this.$nextTick(() => {
          this.$root.$loading.start()
          try {
            if (isLoading) {
              this.$nuxt.$loading.start()
            } else {
              this.$nuxt.$loading.finish()
            }
          } catch (e) {}
        })
      }
      return isLoading
    },
  },
}
</script>