<template>
  <v-row align="center" class="my-3">
    <v-col cols="8">
      <v-btn class="mr-2" color="success" @click="startPooling">Start Pooling</v-btn>
      <v-btn class="mr-2" color="error" @click="stopPooling">Stop Pooling</v-btn>
    </v-col>
    <v-col cols="4">
      <v-select
          v-model="severities"
          :items="[1, 2, 3, 4, 5]"
          :rules="[v => !!v]"
          chips
          hide-details
          label="Select severity"
          multiple
          outlined
      />
    </v-col>
    <v-col
        v-for="warning in filteredWarnings"
        :key="warning.id"
        cols="12" md="6" xl="4"
    >
      <Warning
          :warning="warning"
      />
    </v-col>
  </v-row>
</template>

<script>

import Warning from "@/components/Warning";
import {timer} from "rxjs";
import axios from "axios";

export default {
  name: "WarningsPool",
  components: {Warning},
  data() {
    return {
      subscription: null,
      warnings: [],
      severities: [3]
    }
  },
  computed: {
    filteredWarnings() {
      return this.warnings
          .filter(warning => {
            return this.severities.includes(warning.severity)
          })
    }
  },
  methods: {
    startPooling() {
      this.subscription = timer(0, 5000)
          .subscribe(() => this.fetchWarnings())
    },
    stopPooling() {
      if (this.subscription)
        this.subscription.unsubscribe()
    },
    fetchWarnings() {
      axios.get("http://localhost:8080/warnings")
          .then(response => this.warnings = response.data.warnings)
    }
  },
  destroyed() {
    this.stopPooling()
  }
}
</script>

<style scoped>

</style>