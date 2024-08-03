<script setup>
import api from "../../api/index";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const agree = ref(false)
const loading = ref(false);

const driver = ref({
  first_name: "",
  last_name: "",
  phone: "",
  address: "",
  password: ""

});

const createDriver = async () => {
  loading.value = true;
  await api
    .post(`/driver/signup`, driver.value)
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
</script>
<template>
  <v-card class="mx-auto mt-5" max-width="400" title="Create Driver">
    <v-container>
      <v-text-field v-model="driver.first_name" color="primary" label="First name" variant="underlined"></v-text-field>

      <v-text-field v-model="driver.last_name" color="primary" label="Last name" variant="underlined"></v-text-field>

      <v-text-field v-model="driver.address" color="primary" label="Adreess" variant="underlined"></v-text-field>

      <v-text-field v-model="driver.phone" color="primary" label="Phone" variant="underlined"></v-text-field>

      <v-text-field v-model="driver.password" color="primary" label="Password" placeholder="Enter your password"
        variant="underlined"></v-text-field>

      <v-checkbox v-model="agree" color="secondary" label="I agree to site terms and conditions"></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" v-if="agree" @click="createDriver">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

