<template>
  <div>
    <v-layout>
      <Sidebar />
      <v-main>
        <Navbar />
        <div class="py-2 px-5">
          <RouterView />
        </div>
      </v-main>
    </v-layout>

  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
</script>

<style lang="scss" scoped></style>