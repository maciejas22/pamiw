import { Link, Outlet } from '@tanstack/react-router'
import { Group } from '@mantine/core'
import styles from './layout.module.css'

export const Layout = () => {
  return (
    <>
      <header className={styles.header}>
        <Group h='100%' justify='center'>
          <Link to='/books' className={styles.link}>
            Books
          </Link>
          <Link to='/authors' className={styles.link}>
            Authors
          </Link>
        </Group>
      </header>
      <Outlet />
    </>
  )
}
