import { PrismaClient } from "@prisma/client";
declare global {
    var database: PrismaClient
}
let prisma: PrismaClient;

if(process.env.NODE_ENV === 'production'){
    prisma = new PrismaClient();
}else {
    if(!global.database){
        global.database = new PrismaClient();
    }
    prisma = global.database;
}

export default prisma;
