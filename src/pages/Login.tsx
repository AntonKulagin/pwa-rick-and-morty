import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useForm } from '@mantine/form'
import { Box, Button, Group, TextInput } from '@mantine/core'

interface IForm {
  email: string
}

export const Login = () => {
  const auth = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  const locationFrom = location.state?.from || '/'

  const handleSubmit = (values: IForm) => {
    if (values.email) {
      auth.signin(values.email, () => {
        navigate(locationFrom, {
          replace: true,
        })
      })
    }
  }

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  return (
    <Box maw={300} mx='auto'>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput withAsterisk label='Email' placeholder='your@email.com' {...form.getInputProps('email')} />

        <Group position='right' mt='md'>
          <Button type='submit'>Submit</Button>
        </Group>
      </form>
    </Box>
  )
}
