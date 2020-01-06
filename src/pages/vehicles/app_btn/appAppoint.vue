<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
<!--      <div id="fast_appointment" v-on="on" class="fast_appointment mx-auto">立即预约</div>-->
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          Select an app
          <small>Summarize if needed</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">View setup instructions</v-stepper-step>
        <v-stepper-content step="4">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-dialog>

</template>

<script>
  export default {
    name: "appAppoint",
    data() {
      return {
        e6: 1,
      }
    },
  }
</script>

<style scoped>

</style>
