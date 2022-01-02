<template>
  <v-card>
    <v-card-title>{{ `${prediction.place} (${prediction.type})` }}</v-card-title>
    <v-card-subtitle>{{ new Date(prediction.time) }}</v-card-subtitle>
    <v-card-text>
      <div>
        {{ `From ${prediction.from} to ${prediction.to} ${prediction.unit}` }}
      </div>

      <div>
        {{ prediction.precipitation_types ? `Predicted types: ${prediction.precipitation_types.join(", ")}` : null }}
      </div>

      <div>
        {{ prediction.directions ? `Directions: ${prediction.directions.join(", ")}` : null }}
      </div>
    </v-card-text>
    <v-card-actions :class="warningColor">

    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "Warning",
  computed: {
    prediction() {
      return this.warning.prediction
    },
    warningColor: {
      get() {
        switch (this.warning.severity) {
          case 1:
            return "success"
          case 2:
            return "info"
          case 3:
            return "warning"
          case 4:
            return "error"
          default:
            return "primary"
        }
      }
    },
  },
  props: {
    warning: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>