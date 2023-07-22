/**Métodos somente para usuários NÃO LOGADOS */
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { parseCookies } from "nookies";
//função para páginas que so podem ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context)
        //Para tentativas de acesso com usuário JÁ LOGADO, redirecionamos (Ele já tem login salvo)
        //console.log("teste")
        if (cookies['@nextauth.token']) {
            return {
                redirect: {
                    destination: '/home',
                    permanent: false,
                }
            }
        }

        return await fn(context)
    }
}