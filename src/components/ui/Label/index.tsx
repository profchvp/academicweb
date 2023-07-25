import styles from './styles.module.scss'
import { LabelHTMLAttributes,  } from 'react'

interface  LabelProps extends  LabelHTMLAttributes<HTMLLabelElement>{}



export  function Label({...rest}:LabelProps){
    return (
        <label className={styles.label}   {...rest}></label>
        
       
    )
}
