<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../api/index";
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const driver = ref([]);

const getDriversUpdateId = async () => {
  loading.value = true;
  api
    .put(`/driver/${route.params.id}`)
    .then((res) => { })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getDriver = async () => {
  loading.value = true;
  api
    .get(`/driver/${route.params.id}`)
    .then((res) => {
      driver.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};
// console.log("driver", driver);
const save = async () => {
  loading.value = true;
  api
    .patch(`/driver/${route.params.id}`, {
      first_name: driver.value.first_name,
      last_name: driver.value.last_name,
      phone: driver.value.phone,
      address: driver.value.address,
      password: driver.value.password,
    })
    .then((res) => {
      router.push("/drivers");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const rules = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 3) || "Min 3 characters",
];

getDriver();
</script>

<template>
  <v-container class="d-flex">
    <h1>Driver update</h1>
    <v-row align="center" justify="end">
      <v-col cols="auto">
        <v-btn density="default" icon="mdi-open-in-new" @click="router.go(-1)"></v-btn>
      </v-col>
    </v-row>
  </v-container>

  <div>
    <v-text-field :rules="rules" hide-details="auto" v-model="driver.first_name" label="First name"></v-text-field>
    <v-text-field :rules="rules" hide-details="auto" v-model="driver.last_name" label="Last name"></v-text-field>
    <v-text-field :rules="rules" hide-details="auto" v-model="driver.phone" label="Phone number"></v-text-field>
    <v-text-field :rules="rules" hide-details="auto" v-model="driver.address" label="Address"></v-text-field>
    <v-text-field :rules="rules" hide-details="auto" v-model="driver.password" label="Password"></v-text-field>
    <v-btn block @click="save">Save</v-btn>
  </div>
</template>

<style scoped></style>
