<template>
  <v-row align="center" class="my-3">
    <v-col cols="8">
      <v-btn class="mr-2" color="success" @click="subscribe">Subscribe</v-btn>
      <v-btn class="mr-2" color="error" @click="unsubscribe">Unsubscribe</v-btn>
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
import {webSocket} from "rxjs/webSocket";
import Warning from "@/components/Warning";

export default {
  name: "Warnings",
  components: {Warning},
  data() {
    return {
      subject: null,
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
    unsubscribe() {
      this.subject.next({message: 'unsubscribe'})
    },
    subscribe() {
      this.subject.next({message: 'subscribe'})
    },
    handleError(err) {
      console.error(err)
    },
    handleMessage(msg) {
      console.log("Message received", msg)
      const {warnings} = msg;
      if (warnings)
        this.warnings = warnings.filter(warning => warning.prediction)
      else {
        if (!msg.prediction) {
          const index = this.warnings.indexOf(msg);
          if (index > -1) {
            this.warnings.splice(index, 1);
          }
        } else {
          this.warnings.push(msg)
        }
      }
    },
    handleComplete() {
      console.log("Connection successfully established")
    }
  },
  created() {
    this.subject = webSocket('ws://localhost:8090/warnings')
  },
  mounted() {
    this.subscription = this.subject.subscribe({
      next: this.handleMessage,
      error: this.handleError,
      complete: this.handleComplete,
    });
  },
  destroyed() {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
}
</script>

<style scoped>

</style>