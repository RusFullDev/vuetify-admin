<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useToggleSidebar } from "../composable/useToggleSidebar";
import { useRouter } from "vue-router";
import Dropdawn from "./Dropdawn.vue";

const { isOpenSidebar } = useToggleSidebar();
const theme = useTheme();
const router = useRouter();
const dropdown = ref(false);

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

const logout = async () => {
  localStorage.clear("adminData");
  router.push("/login");
};
</script>

<template>
  <div>
    <v-app-bar density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          @click="isOpenSidebar = !isOpenSidebar"
        ></v-app-bar-nav-icon>
      </template>

      <template v-slot:append>
        <div class="d-flex ga-2 align-center">
          <p>Light</p>
          <v-switch
            @click="toggleTheme"
            false-value="Dark"
            true-value="Light"
            hide-details
          ></v-switch>
          <p>Dark</p>

          <Dropdawn />
        </div>
      </template>
    </v-app-bar>
  </div>
</template>
