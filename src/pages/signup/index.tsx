
import { useState, FormEvent, useContext } from 'react'

import Head from 'next/head'
import logoImg from '../../../public/exclamation-icons.svg'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import Link from 'next/link';

import { AuthContext } from '../../contexts/AuthContext'
import { sign } from 'crypto'
import {toast} from 'react-toastify';
export default function Signup() {
    const { signUp } = useContext(AuthContext);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        /**FormEvent é um parâmetro do formulário "onSubmit" */
        event.preventDefault();
        if (nome === '' || email === '' || password === '') {
            //alert("Preencha todos os campos")
            toast.error("Preencha todos os campos")
            return
        }
        setLoading(true);

        let data = {
            nome,
            email,
            password
        }
        await signUp(data)

        setLoading(false)
    }
    return (
        <>
            <Head>
                <title>Faça Seu Cadastro Agora</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Academic Project" />
                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSignUp}>
                        <Input
                            placeholder='Digite seu nome'
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
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
                            loading={loading}
                        >
                            Cadastrar
                        </Button>
                    </form>

                </div>
                <Link href="/">
                    Já possui uma conta? Faça Login
                </Link>
            </div>
        </>
    )
}
