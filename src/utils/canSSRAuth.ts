/**Métodos somente para usuários NÃO LOGADOS*/
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { parseCookies, destroyCookie } from "nookies";

import { AuthTokenError } from "../services/errors/AuthTokenError";

//Função para páginas somente para logados que podem ter acesso

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        //verificar se existe Cookie: Se existir destruir Cookie e voltar ao Login
        const cookies = parseCookies(context);

        const token = cookies['@nextauth.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,

                }
            }

        }
        try {
            return await fn(context);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                //destruir o Token
                destroyCookie(context, '@nextauth.token');
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,

                    }
                }
            }
        }
    }
}

