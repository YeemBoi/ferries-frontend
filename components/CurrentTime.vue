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
      let timeStr = date.toLocaleTimeString('en-US', { hour12: true, second: null })
      if (date.getDate() === this.$now().getDate() +1 ) {
          timeStr += " tomorrow"
      }
      return timeStr
    }
  },
}
</script>