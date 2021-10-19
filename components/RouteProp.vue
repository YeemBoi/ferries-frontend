<template>
  <v-chip :value="value" :color="color" :filter="filter">{{ text }} </v-chip>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    filter: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>