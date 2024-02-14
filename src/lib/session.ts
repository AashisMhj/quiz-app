import { cookies } from "next/headers";

const SESSION_KEY = 'session';
type SessionDataType = {
    [key:string]: {
        questions: number[],
        current_index: number,
        correct_answer: number
    }
}
export function setSession(data:SessionDataType){
    const expires = new Date(Date.now() + 10 * 1000);
    cookies().set(SESSION_KEY, JSON.stringify(data), {expires, httpOnly: true});
}

export function getSession(){
    const value = cookies().get(SESSION_KEY)?.value;
    if(value){
        return JSON.parse(value) as SessionDataType;
    }else {
        return null;
    }
}