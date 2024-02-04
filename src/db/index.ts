import { AceBase } from "acebase";

declare global{
    var database:AceBase | undefined
}
let db:AceBase;
if(process.env.NODE_ENV === 'production'){
    db = new AceBase(process.env.DB_NAME || 'my_db');
}else{
    if(!global.database){
        global.database = new AceBase(process.env.DB_NAME || 'my_db');
    }
    db = global.database
}

export default db;