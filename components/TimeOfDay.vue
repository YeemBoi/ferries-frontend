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
    },
    checkTmrw: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    friendlyTime() {
      const date = new Date(this.time+'Z')
      let timeStr = date.toLocaleTimeString([], {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      if (this.checkTmrw && date.getDate() === this.$now().getDate() + 1) {
        timeStr += ' tomorrow'
      }
      return timeStr
    },
  },
}
</script>