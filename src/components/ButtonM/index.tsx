import styles from './styles.module.css'

interface IButtonMProps {
  color?: 'primary' | 'secondary' | 'danger' | 'success'
}

export function ButtonM({ color = 'primary' }: IButtonMProps) {
  return <button className={`${styles.button} ${styles[color]}`}>Enviar</button>
}
