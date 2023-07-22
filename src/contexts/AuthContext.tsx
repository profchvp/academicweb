import { createContext, ReactNode, useState, useEffect } from "react";

import { api } from "../services/apiClient";

import { destroyCookie, setCookie, parseCookies } from 'nookies'

import Router from 'next/router'

import { toast } from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (Credentials: SignInProps) => Promise<void>
    signOut: () => void;
    signUp: (Credentials: SignUpProps) => Promise<void>
}
type UserProps = {
    id: string;
    nome: string;
    email: string
}
type SignInProps = {
    email: string;
    password: string;
}
type AuthproviderProps = {
    children: ReactNode;
}
type SignUpProps = {
    nome: string;
    email: string;
    password: string;

}
export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar')
    }
}
export function AuthProvider({ children }: AuthproviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user /* !! Converte para booleano */
    //Será executado todas as vezes que este componente é carregado
    useEffect(() => {
        //tentar obter algo no cookie
        const { '@nextauth.token': token } = parseCookies();
        if (token) {
            //fazer a chama da API
            api.get('/me').then(response => {
                const { id, nome, email } = response.data;
                setUser({
                    id,
                    nome,
                    email
                })
            })
                .catch(() => {
                    //se deu erro, devemos "deslogar" o usuário
                    signOut();
                })

        }
    }, [])

    //
    async function signIn({ email, password }: SignInProps) {
        //alert("email recebido" + email + " Senha: " + password)
        try {
            const response = await api.post('session', {
                email,
                password
            })
            //console.log(response.data)
            /**Salvando Cookies e token */
            const { id, nome, token } = response.data //desconstruimos "data"
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //expira em 1 mês
                path: "/" //"/" deixa todos os caminhas ter acesso ao token
            })
            setUser({
                id,
                nome,
                email,
            })
            //Enviar (próximas requisições)para todas as rotas, o token de autenticação
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com Sucesso')
            //Redirecionar para a página seguinte (Nosso casso “Home“)
            Router.push('/home');

        } catch (err) {
            //console.log("erro ao acessar", err)
            toast.error('Erro ao Acessar')
        }

    }
    async function signUp({ nome, email, password }: SignUpProps) {
        //console.log("Nome recebido: " + nome)
        try {
            const response = await api.post('/usuario', {
                nome,
                email,
                password
            })
            //console.log("Cadastrado com Sucesso")
            toast.success('Cadastrado com Sucesso')

            Router.push('/')
        } catch (err) {
            //console.log("Erro ao cadastrar ", err)
            toast.error('Erro ao Cadastrar')
        }


    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}