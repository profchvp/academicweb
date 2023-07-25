import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'


export function Header() {

    const { user } = useContext(AuthContext)
    const { signOut } = useContext(AuthContext)
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/home">
                    <img src="/exclamation-icons.svg" width={190} height={60} />
                </Link>
                <h1>{user?.nome} - {user?.email}-{user?.role}</h1>
                <nav className={styles.menuNav}>
                    <Link href="/categoria">
                        Categoria
                    </Link>
                    <Link href="/categoria">
                        Categoria
                    </Link>
                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}