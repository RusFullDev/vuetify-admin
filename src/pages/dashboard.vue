 <script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { ref } from "vue";
import StatisticCard from "../components/order/statistic-card.vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const loading = ref(false);
// const userStatistic = ref([])

// const getStatisticUsers = async()=>{
//    loading.value = true;
//   api
//     .get(`/stats/users-by-month`)
//     .then((res) => {
//       console.log(res);
//       userStatistic.value = res.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       loading.value = false;
//     });
// }

const data = ref({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Users",
      backgroundColor: "#f87979",
      borderColor: "#f87979",
      data: [30, 20, 10, 40, 39, 85, 40, 20, 64, 50, 60, 75],
       fill: false,
      
    },
    {
      label: "Drivers",
      backgroundColor: "#C0C0C0",
      borderColor: "#C0C0C0",
      data: [20, 39, 10, 40, 36, 70, 38, 30, 20, 25, 35, 45],
      tension: 0.1,
      fill: false,
    
    },
    {
      label: "Order-taxi",
      backgroundColor: "#DFFF00",
      borderColor: "#DFFF00",
      data: [5, 39, 10, 20, 25, 50, 45, 35, 20, 10, 40, 39],
      tension: 0.2,
      fill: false,
   
    },
    {
      label: "Order-truck",
      backgroundColor: "#6495ED",
      borderColor: "#6495ED",
      data: [15, 30, 19, 25, 20, 40, 35, 15, 30, 20, 30, 45],
      tension: 0.2,
      fill: false,
    
    },
  ],
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
   options: {
    responsive: true,
     }
});

// getStatisticUsers()
</script>
<template>
  <div>
<StatisticCard  :data="data"/>
  </div>
 <div>
   <Line :data="data" :options="options" style="height: 400px;"/>
 </div>
</template> 

