<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../api/index";
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const driver = ref([]);

const getDriversById = async () => {
  loading.value = true;
  api
    .get(`/driver/${route.params.id}`)
    .then((res) => {
      driver.value = res.data;
      console.log("sddd", driver);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

getDriversById();
</script>

<template>
  <v-container class="d-flex">
    <h1>Driver details</h1>
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

  <div class="d-flex align-center">
    <div class="ma-4">
      <div class="text-subtitle-2 d-flex ga-2">
        <h3>{{ driver.first_name }}</h3>
        <h3>{{ driver.last_name }}</h3>
      </div>
      <v-img
        :aspect-ratio="1"
        class="bg-white"
        :src="driver.photo"
        width="200"
      ></v-img>
    </div>
    <div class="ma-4">
      <div class="text-subtitle-2">Driver license</div>
      <v-img
        :aspect-ratio="1"
        class="bg-white"
        :src="driver.driver_license"
        width="200"
        cover
      ></v-img>
    </div>
  </div>

  <div>
    <h1>Cars</h1>
    <div v-for="item in driver.driver_car">
      <div class="d-flex">
        <div class="ma-4">
          <div class="text-subtitle-2">
           <h3>Model:{{ item.car.model }}</h3>
          </div>
          <v-img
            :aspect-ratio="1"
            class="bg-white"
            :src="item.car.photo"
            width="200"
            cover
          ></v-img>
        </div>
        <div class="ma-4">
          <div class="text-subtitle-2">
          <h3>Number: {{ item.car.number }}</h3>
             </div>
          <v-img
            :aspect-ratio="1"
            class="bg-white"
            :src="item.car?.text_passport"
            width="200"
            cover
          ></v-img>
        </div>
      </div>
    </div>
  </div>
</template>
