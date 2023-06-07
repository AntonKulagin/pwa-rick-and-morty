import { Button } from '@mantine/core'
import { FC } from 'react'
import { IconArrowBigLeftLines } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

interface GoBackProps {
  goBackUrl: string
}

export const GoBack: FC<GoBackProps> = ({ goBackUrl }) => {
  const navigate = useNavigate()
  return (
    <Button leftIcon={<IconArrowBigLeftLines />} variant='subtle' onClick={() => navigate(`${goBackUrl}`)} mb={5}>
      Назад
    </Button>
  )
}
