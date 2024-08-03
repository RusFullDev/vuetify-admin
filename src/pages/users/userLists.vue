<script setup>
import api from "../../api/index";
import { ref, computed, watch, onMounted, nextTick } from "vue";

const dialog = ref(false);
const dialogDelete = ref(false);
const loading = ref(false);

const pagination = ref({
  page: 1,
  limit: 10,
});

const headers = ref([
  {
    title: "№",
    align: "start",
    sortable: false,
    key: "index",
  },
  {
    title: "Name",
    align: "start",
    sortable: false,
    key: "name",
  },
  {
    title: "Phone",
    align: "start",
    sortable: false,
    key: "phone",
  },
  {
    title: "Password",
    align: "start",
    sortable: false,
    key: "hashed_password",
  },
  {
    title: "Actions",
    align: "end",
    key: "actions",
    sortable: false,
  },
]);

const users = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  phone: "",
  password: "",
  confirm_password: "",
});
const defaultItem = {
  name: "",
  phone: "",
  password: "",
  confirm_password: "",
};

const formTitle = computed(() =>
  editedIndex.value === -1 ? "New User" : "Edit User"
);

watch(dialog, (val) => {
  if (!val) close();
});
watch(dialogDelete, (val) => {
  if (!val) closeDelete();
});

const initialize = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/users`);
    users.value = res.data;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

const editItem = (item) => {
  editedIndex.value = users.value.indexOf(item);
  editedItem.value = {
    id: item.id,
    name: item.name,
    phone: item.phone,
    password: item.password,
  };
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = users.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  loading.value = true;
  try {
    await api.delete(`/users/${editedItem.value.id}`);
    users.value.splice(editedIndex.value, 1);
    closeDelete();
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
  });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
  });
};

const save = async () => {
  loading.value = true;
  try {
    if (editedIndex.value > -1) {
      await api.put(`/users/${editedItem.value.id}`, {
        name: editedItem.value.name,
        phone: editedItem.value.phone,
        password: editedItem.value.password,
      });
      initialize();
    } else {
      await api.post(`/users/signUp`, editedItem.value);
      initialize();
    }
    close();
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

onMounted(initialize);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="users"
    hover
    :loading="loading"
    :items-per-page="pagination.limit"
    :page="pagination.page"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>User list</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              Create
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.name"
                    label="User name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.phone"
                    label="Phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.password"
                    label="Password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.confirm_password"
                    label="Confirm password"
                  ></v-text-field>
                </v-col>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"
                >Cancel</v-btn
              >
              <v-btn color="blue-darken-1" variant="text" @click="save"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this User?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.index="{ index }">
      {{ index + 1 }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)"
        >mdi-pencil</v-icon
      >
      <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
