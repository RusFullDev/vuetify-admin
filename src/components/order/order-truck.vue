<script setup>
import { ref } from "vue";
import api from "../../api/index";
import { useRouter } from "vue-router";

const router = useRouter();

const orders = ref([]);
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
    title: "User",
    align: "start",
    sortable: false,
    key: "User.name",
  },
  {
    title: "From district",
    align: "start",
    sortable: false,
    key: "from_district",
  },
  {
    title: "To district",
    align: "start",
    sortable: false,
    key: "to_district",
  },

  {
    title: "date",
    align: "start",
    sortable: false,
    key: "date",
  },
  {
    title: "Distance",
    align: "start",
    sortable: false,
    key: "distance",
  },
  {
    title: "Duration",
    align: "start",
    sortable: false,
    key: "duration",
  },
  {
    title: "Actions",
    align: "end",
    key: "actions",
    sortable: false,
  },
];

const deleteUser = async (item) => {
   loading.value = true;
  api
    .delete(`/order-truck/${item.id}`)
    .then((res) => {
      orders.value = res.data;
      getOrderTruck()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getOrderTruck = async () => {
  loading.value = true;
  api
    .get(`/order-truck`)
    .then((res) => {
      // console.log(res);
      orders.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

// const editUser = async (item) => {
//   console.log("das", item);
// };

getOrderTruck();
</script>

<template>
  <div>
    <h1>Order truck</h1>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="orders"
      :items-per-page="pagination.limit"
      :page="pagination.page"
      hover
      @click.row=""
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.index="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.date="{ item }">
        {{ item.date.slice(0, 10) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-btn size="small" @click="editUser(item)" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn> -->
           <v-btn
          size="small"
          @click="router.push(`/order-truck/${item.id}`)"
          icon
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn size="small" @click="deleteUser(item)" icon>
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
       <template v-slot:no-data>
      <v-btn color="primary" @click="getOrderTruck">Reset</v-btn>
    </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
