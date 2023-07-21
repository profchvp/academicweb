import styles from './styles.module.scss'
import { FaSpinner } from 'react-icons/fa'

import { ReactNode, ButtonHTMLAttributes } from 'react'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}
export function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button
            className={styles.button}
            disabled={loading}
            {...rest}
        >
            {
                loading ? (
                    <FaSpinner color="#fff" size={16} />
                ) : (
                    <a className={styles.buttonText}>
                        {children}
                    </a>
                )
            }
        </button>
    )
}