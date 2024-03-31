import { Image } from '@mantine/core'

const mainImage = 'https://leonardo.osnova.io/0770936f-8b7a-e992-b0f8-2f59bc227872/-/preview/1100/-/format/webp/'

export const MainPage = () => {
  return <Image maw={500} mx='auto' radius='md' src={mainImage} alt='mainImage' caption='Веленная Рика и Морти' />
}
