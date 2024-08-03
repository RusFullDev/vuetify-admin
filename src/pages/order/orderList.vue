<script setup>
import { ref } from 'vue';
import orderTaxi from "../../components/order/order-taxi.vue"
import orderTruck from "../../components/order/order-truck.vue"
import orderPochta from "../../components/order/order-pochta.vue"
const tab = ref(null)
</script>

<template>
    <div>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
    >
      <v-tab :value="1">Order taxi</v-tab>
      <v-tab :value="2">Order truck</v-tab>
      <v-tab :value="3">Pochta</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <orderTaxi v-if="n==1" />
        <orderTruck v-if="n==2" />
        <orderPochta v-if="n==3" />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</div>

</template>

<style lang="scss" scoped></style>