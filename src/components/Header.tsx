import { useState } from 'react'
import { createStyles, Header, Container, Group, Burger, rem, Paper, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MantineLogo } from '@mantine/ds'
import { Link, useNavigate } from 'react-router-dom'

import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconSun, IconMoonStars, IconLogout } from '@tabler/icons-react'
import { useAuth } from '../context/AuthContext'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: 0,
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

export interface HeaderSimpleProps {
  links: { link: string; label: string }[]
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
  const auth = useAuth()
  const navigate = useNavigate()
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(localStorage.getItem('activePage') || links[0].link)
  const { classes, cx } = useStyles()

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={() => {
        setActive(link.link)
        localStorage.setItem('activePage', link.link)
      }}
    >
      {link.label}
    </Link>
  ))

  const handleLogOut = () => {
    auth.signout(() => navigate('/'))
  }

  return (
    <Header height={60} mb={'lg'}>
      <Container className={classes.header}>
        <Paper style={{ flex: '1 1 auto' }}>
          <MantineLogo size={28} style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
        </Paper>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        {auth.userEmail && (
          <Button compact variant='subtle' onClick={handleLogOut} ml={10}>
            <IconLogout />
          </Button>
        )}

        <ActionIcon
          ml={10}
          variant='outline'
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title='Toggle color scheme'
        >
          {dark ? <IconSun size='1.1rem' /> : <IconMoonStars size='1.1rem' />}
        </ActionIcon>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' ml={10} />
      </Container>
    </Header>
  )
}
