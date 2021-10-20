<template>
  <v-chip-group v-model="dynamicVal" :multiple="Boolean(value)" v-bind="groupProps">
    <v-chip
      v-for="routeProp in routePropItems.filter(
        (routeProp) => route[routeProp.value]
      )"
      v-bind="chipProps"
      :key="routeProp.value"
      :color="routeProp.color"
      :value="routeProp.value"
      :filter="filter"
      >{{ routeProp.text }}
    </v-chip>
  </v-chip-group>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: null,
    },
    route: {
      type: Object,
      required: true,
    },
    filter: {
      type: Boolean,
      required: false,
      default: false,
    },
    chipProps: {
      type: Object,
      required: false,
      default: () => {},
    },
    groupProps: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  emits: ['input'],
  data() {
    return {
      dynamicVal: this.value,
      routePropItems: [
        {
          value: 'isBookable',
          text: 'Bookable',
          color: 'green',
        },
        {
          value: 'isWalkOn',
          text: 'Walk-on',
          color: 'blue',
        },
        {
          value: 'limitedAvailability',
          text: 'Limited',
          color: 'red',
        },
        {
          value: 'allowWalkOnOptions',
          text: 'Walk-on options',
          color: 'teal',
        },
        {
          value: 'allowMotorcycles',
          text: 'Motorcycles',
          color: 'orange',
        },
        {
          value: 'allowLivestock',
          text: 'Livestock',
          color: 'brown',
        },
        {
          value: 'allowAdditionalPassengerTypes',
          text: 'Other passenger types',
          color: 'grey',
        },
      ],
    }
  },
  watch: {
    value(val) {
      this.dynamicVal = val
    },
    dynamicVal() {
      this.$emit('input', this.dynamicVal)
    },
  },
}
</script>