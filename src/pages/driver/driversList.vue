<script setup>
import { ref } from "vue";
import api from "../../api/index";
import { useRouter } from "vue-router";

const router = useRouter();
const drivers = ref([]);
const loading = ref(false);

const pagination = ref({
  page: 1,
  limit: 10,
});

const headers = [
  {
    title: "№",
    align: "start",
    sortable: false,
    key: "index",
  },
  {
    title: "First name",
    align: "start",
    sortable: false,
    key: "first_name",
  },
  {
    title: "Last name",
    align: "start",
    sortable: false,
    key: "last_name",
  },
  {
    title: "Phone",
    align: "start",
    sortable: false,
    key: "phone",
  },
  {
    title: "Address",
    align: "start",
    sortable: false,
    key: "address",
  },
  {
    title: "Balance",
    align: "start",
    sortable: false,
    key: "total_balance",
  },
  {
    title: "status",
    align: "start",
    sortable: false,
    key: "is_active",
  },
  {
    title: "Actions",
    align: "end",
    key: "actions",
    sortable: false,
  },
];

const deleteDriver = async (item) => {
  loading.value = true;
  api
    .delete(`/driver/${item.id}`)
    .then((res) => {
      getDrivers();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getDrivers = async () => {
  loading.value = true;
  api
    .get(`/driver`)
    .then((res) => {
      drivers.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};
const updateDriver = async (id, status) => {
  loading.value = true;
  await api
    .patch(`/driver/ischeck/${id}`, {
      status,
    })
    .then((res) => {
      drivers.value = res.data;
      getDrivers();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

getDrivers();
</script>

<template>
  <div class="">
    <div class="d-flex justify-space-between align-center">
      <h1>Driver list</h1>
      <v-btn variant="tonal" @click="router.push(`/create-driver`)">
        Create Driver
      </v-btn>
    </div>
    <v-data-table :headers="headers" :loading="loading" :items="drivers" :items-per-page="pagination.limit"
      :page="pagination.page" hover>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.index="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.is_active="{ item }">
        <v-switch base-color="red" color="success" v-model="item.is_active"
          @change="updateDriver(item.id, item.is_active)"></v-switch>
      </template>
      <template v-slot:item.actions="{ item }" class="d-flex">
        <v-btn size="small" @click="router.push(`/driver-detail/${item.id}`)" icon>
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn size="small" @click="router.push(`/update-driver/${item.id}`)" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn size="small" @click="deleteDriver(item)" icon>
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getDrivers">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style lang="scss" scoped></style>
