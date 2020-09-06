import useSWR from 'swr'
import api from '../services/api'

export function useFetch(url: string, interval?: number) {
  let int = 60000
  if (interval) {
    int = interval
  }
  const { data, error } = useSWR(
    url,
    async (url) => {
      const response = await api.get(url)

      return response.data
    },
    {
      refreshInterval: int,
    }
  )

  return { data, error }
}
