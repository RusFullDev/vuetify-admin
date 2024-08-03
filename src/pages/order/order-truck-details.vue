<script setup>
import { useRouter, useRoute } from "vue-router";
import api from "../../api/index";
import { ref } from "vue";

const orders = ref([]);
const loading = ref(false);
const router = useRouter();
const route = useRoute();
const headers = ref([]);

const getOrderTruckById = async () => {
  loading.value = true;
  await api
    .get(`/order-truck/${route.params.id}`)
    .then((res) => {
      orders.value = res.data;
      headers.value = [
        { title: "Description", key: orders.value.description },
        { title: "Cargo type", key: orders.value.cargo_type },
        { title: "Capacity", key: orders.value.capacity },
        {title: "Recipient name",key: orders.value.recipient_name},
        {title: "Recipient phone",key: orders.value.recipient_phone},
        { title: "Location", key: orders.value.location }];
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

getOrderTruckById();
</script>

<template>
  <v-container class="d-flex">
    <h1>Truck details</h1>
    <v-row align="center" justify="end">
      <v-col cols="auto">
        <v-btn
          density="default"
          icon="mdi-open-in-new"
          @click="router.go(-1)"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-list lines="two" width="800px">
    <v-list-item v-for="n in headers">
      {{ n.title }} : {{ n.key }}
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
