<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: Object,
});

</script>
<template>
  <v-row align="center" justify="center" dense>
    <v-col cols="12" md="6">
      <v-card
        class="mx-auto"
        color="#f87979"
        prepend-icon="mdi-account"
        title="Users"
      >
        <div class="d-flex">
          <v-card-text>Number of users</v-card-text>
          <v-card-text
            >{{
              props?.data?.datasets?.[0]?.data.reduce((a, b) => a + b, 0) || 0
            }}
          </v-card-text>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card
        class="mx-auto"
        color="#C0C0C0"
        prepend-icon="mdi-account-tie-hat"
        title="Drivers"
      >
        <div class="d-flex">
          <v-card-text>Number of drivers</v-card-text>
          <v-card-text
            >{{
              props?.data?.datasets?.[1]?.data.reduce((a, b) => a + b, 0) || 0
            }}
          </v-card-text>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card
        class="mx-auto"
        color="#DFFF00"
        prepend-icon="mdi-taxi"
        title="Order taxi"
      >
        <div class="d-flex">
          <v-card-text>Number of taxi orders</v-card-text>
          <v-card-text
            >{{
              props?.data?.datasets?.[2]?.data.reduce((a, b) => a + b, 0) || 0
            }}
          </v-card-text>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card
        class="mx-auto"
        color="#6495ED"
        prepend-icon="mdi-truck"
        title="Order truck"
      >
        <div class="d-flex">
          <v-card-text>Number of truck orders</v-card-text>
          <v-card-text
            >{{
              props?.data?.datasets?.[3]?.data.reduce((a, b) => a + b, 0) || 0
            }}
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
