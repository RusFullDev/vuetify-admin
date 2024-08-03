<script setup>
import { useStore } from "../store";
import { ref } from "vue";
import { useRouter } from "vue-router";



const router = useRouter();
const store = useStore();
const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);

store.adminData = JSON.parse(localStorage.getItem("adminData"));
const logout = async () => {
  localStorage.clear("adminData");
  router.push("/login");
};
</script>



<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-btn
          color="indigo"
          v-bind="props"
          density="default"
          icon="mdi-dots-vertical"
        >
        </v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            :subtitle=store.adminData.phone 
            :title=store.adminData.name
          >
            <template v-slot:append>
              <v-btn
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart"
                variant="text"
                @click="fav = !fav"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
          <v-btn block @click="logout">Logout</v-btn>


        <!-- <v-list>
          <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item>

          <v-list-item>
            <v-switch
              v-model="hints"
              color="purple"
              label="Enable hints"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="menu = false">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="text" @click="menu = false">
            Save
          </v-btn>
        </v-card-actions> -->
     
    
    </v-card>
    </v-menu>
  </div>
</template>

