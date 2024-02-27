import { PrismaClient } from "@prisma/client";
declare global {
    // eslint-disable-next-line 
    var database: PrismaClient 
}
let prisma: PrismaClient;
// eslint-disable-next-line 
const logOptions = [
    {
        emit: 'stdout',
        level: 'query',
    },
    {
        emit: 'stdout',
        level: 'error',
    },
    {
        emit: 'stdout',
        level: 'info',
    },
    {
        emit: 'stdout',
        level: 'warn',
    },
];

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.database) {
        global.database = new PrismaClient();
    }
    prisma = global.database;
}

export default prisma;
