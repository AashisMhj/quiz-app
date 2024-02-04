
import data from "@/data/solutions-architect/data.json";
import db from "@/db";


db.ready(async ()=>{
    await db.ref('question').set(data)
})