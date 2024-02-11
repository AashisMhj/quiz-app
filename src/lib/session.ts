import { cookies } from "next/headers";

const SESSION_KEY = 'session';

export function setSession(data:any){
    const expires = new Date(Date.now() + 10 * 1000);
    cookies().set(SESSION_KEY, data, {expires, httpOnly: true});
}

export function getSession(){
    return cookies().get(SESSION_KEY)?.value
}