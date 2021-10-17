<template>
  <span>{{ time ? friendlyTime : 'N/A' }}</span>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      required: false,
      default: null,
    }
  },
  computed: {
    friendlyTime() {
      const date = new Date(this.time)
      let timeStr = date.toLocaleTimeString().replace(/:00(?!.*:00)/, '')
      if (date.getDate() === this.$now().getDate() +1 ) {
          timeStr += " tomorrow"
      }
      return timeStr
    }
  },
}
</script>