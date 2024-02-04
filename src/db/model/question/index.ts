import db from "../../index";

export const questionList = async() =>{
    const snapshot = await db.ref('question').get();
    if(snapshot.exists()){
        return snapshot.val()
    }else{
        return null;
    }
}