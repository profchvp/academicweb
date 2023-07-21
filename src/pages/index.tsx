
import { useContext, FormEvent, useState } from 'react'
import Head from 'next/head'
import logoImg from '../../public/exclamation-icons.svg'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { AuthContext } from '../contexts/AuthContext';

import Link from 'next/link';
import {toast} from 'react-toastify';
export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    /**Para não recarregar automaticamente a página */
    event.preventDefault()
    if (email === '' || password === '') {
      toast.error("Preencha os dados")
      return
    }


    //chamar o método "signIn()"
    let data = {
      email,
      password
    }
    setLoading(true)
    await signIn(data)
    //setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Titulo personalizado</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Academic Project" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='Digite seu email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input placeholder='Digite a sua Senha'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>

        </div>
        <Link href="/signup">
          Não Possui conta? Cadastre-se
        </Link>
      </div>
    </>
  )
}
