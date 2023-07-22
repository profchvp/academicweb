import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import {Header} from '../../components/Header'
export default function Home() {
    return (
        <>
            <Head>
                <title>Acedmic Project</title>
            </Head>


            <div>
                <Header/>
                <h1>Bem Vindo ao "Academic Project"</h1>
            </div>
        </>
    )
}
//SSR para controlar somente usuários LOGADOS
export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
})