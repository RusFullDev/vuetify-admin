<script setup>
import { ref } from "vue";
import api from "../../api/index";
import { useRouter } from "vue-router";

const loading = ref(false);
const visible = ref(false);
const router = useRouter();
const admin = ref({
  phone: "",
  password: "",
});
const errors = ref("")

const loginAdmin = async () => {
  loading.value = true;
  api
    .post(`/admin/signin`, admin.value)
    .then((res) => {
      localStorage.setItem("adminData", JSON.stringify(res.data.admin));
      router.push("/dashboard");
    })
    .catch((err) => {
      errors.value = "Login or password is incorrect"
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <div class="pt-16">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>
      <v-text-field
        v-model="admin.phone"
        density="compact"
        placeholder="Phone number"
        prepend-inner-icon="mdi-phone-outline"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password
        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </div>

      <v-text-field
        v-model="admin.password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card v-if="errors" class="mb-12" color="red" variant="tonal" >
        <v-card-text class="text-medium-emphasis text-caption">
          {{ errors }} 
        </v-card-text>
      </v-card>
      <v-btn
        @click="loginAdmin"
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
      >
        Log In
      </v-btn>
    </v-card>
  </div>
</template>
