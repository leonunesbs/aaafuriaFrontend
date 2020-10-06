import { useRouter } from 'next/router'
import { useFetch } from '../../hooks/useFetch'
import api from '../../services/api'
import { Box, Text } from '@chakra-ui/core'
import Header from '../../components/Header'

interface Item {
  pk: number
  title: string
  price: number
}

const ProductDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const { data }: any = useFetch(`product-detail/${id}/`)
  if (!data) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <Header />
      <Text>{data.title}</Text>
    </>
  )
}

export default ProductDetail
