import { ref } from 'vue'

// Global reactive state for network errors
export const showNetworkError = ref(false)

export function setNetworkError(value) {
  showNetworkError.value = value
}

export function useNetworkError() {
  return {
    showNetworkError,
    setNetworkError
  }
}

