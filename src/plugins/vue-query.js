import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      staleTime: 0,
      networkMode: 'always'
    },
    mutations: {
      networkMode: 'always'
    }
  }
})

export default { queryClient }
