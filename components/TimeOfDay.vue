<template>
  <span>{{ time ? friendlyTime : 'N/A' }}</span>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      required: true,
    }
  },
  computed: {
    friendlyTime() {
      return new Date(this.time).toLocaleTimeString().replace(/:00(?!.*:00)/, '')
    }
  },
}
</script>