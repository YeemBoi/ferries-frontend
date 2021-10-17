<template>
  <v-card>
    <v-card-title>
      <span v-if="text">{{ text }}:&nbsp;</span>
      <NuxtLink :to="`/terminals/${value.code}`">{{ value.name }}</NuxtLink>
    </v-card-title>
    <v-card-subtitle>Code: {{ value.code }}</v-card-subtitle>
    <v-card-text>
      <div v-if="value.city">
        <b>City:</b> {{ value.city.name }} ({{ value.city.code }})
      </div>
      <div v-if="value.geoArea">
        <b>Area:</b> {{ value.geoArea.name }} ({{ value.geoArea.code }})
      </div>
      <div v-if="value.fetchedTime">
        Time fetched: {{ value.fetchedTime }}
      </div>
    </v-card-text>
    <v-card-actions v-if="value.officialPage">
      <ExtLink :to="value.officialPage">Official Page</ExtLink>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: Object,
      required: true,
    },
    setHead: {
      type: Boolean,
      default: false,
    },
  },
  head() {
    if (this.setHead) {
      return {
        title: this.value.name,
      }
    }
  },
}
</script>

<style>
</style>