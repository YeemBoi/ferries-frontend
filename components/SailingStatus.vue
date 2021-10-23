<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-chip v-bind="attrs" :color="activeStatus.color" v-on="on">
        {{ code }}
      </v-chip>
    </template>
    <span>{{ activeStatus.text }}</span>
  </v-tooltip>
</template>
<script>
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      statuses: [
        {
          text: 'On time',
          value: 'GOOD',
          color: 'green',
        },
        {
          text: 'Medical emergency',
          value: 'MEDI',
          color: 'orange',
        },
        {
          text: 'Peak travel; loading max number of vehicles',
          value: 'PEAK',
          color: 'orange',
        },
        {
          text: 'Loading as many vehicles as possible',
          value: 'VHCL',
          color: 'orange',
        },
        {
          text: 'Earlier loading procedure is causing an ongoing delay',
          value: 'ONGN',
          color: 'orange',
        },
        {
          text: 'Mechanical issue causing ongoing delays',
          value: 'MECH',
          color: 'orange',
        },
        {
          text: 'Vessel start up delay, departing ASAP',
          value: 'DELA',
          color: 'orange',
        },
        {
          text: 'Loading and unloading multiple ships',
          value: 'SHIP',
          color: 'orange',
        },
        {
          text: 'Crew member enroute to assist with boarding',
          value: 'CREW',
          color: 'blue',
        },
        {
          text: 'Cancelled',
          value: 'CNCL',
          color: 'red',
        },
        {
          text: 'Helping customers',
          value: 'HELP',
          color: 'blue',
        },
      ],
    }
  },
  computed: {
    activeStatus() {
      return this.statuses.find((status) => status.value === this.code)
    },
  },
}
</script>