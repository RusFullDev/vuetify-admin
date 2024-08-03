<script setup>
import { ref } from "vue";
import { useToggleSidebar } from "../composable/useToggleSidebar";
import { useStore } from "../store";

const { isOpenSidebar } = useToggleSidebar();
const store = useStore();
const drawer = ref(true);
const rail = ref(true)

store.adminData = JSON.parse(localStorage.getItem("adminData"));
</script>

<template>
  <div>
    <v-navigation-drawer :expand-on-hover="true" v-model="drawer" :rail="isOpenSidebar">
      <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" :title="store.adminData.name" nav>
        <p class="!text-sm">{{ store.adminData.phone }}</p>
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail" ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item to="/dashboard" color="gray" :exact="true" prepend-icon="mdi-home-city" title="Home"
          value="home"></v-list-item>
        <v-list-item to="/drivers" color="gray" prepend-icon="mdi-card-account-details" title="Drivers"
          value="account"></v-list-item>
        <v-list-item to="/users" prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        <v-list-item to="/orders" prepend-icon="mdi-order-bool-ascending" title="Orders" value="orders"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped></style>
