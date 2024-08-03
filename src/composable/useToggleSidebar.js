import { ref } from "vue";

const isOpenSidebar = ref(false)

export function useToggleSidebar() {
  return { isOpenSidebar }
} 
