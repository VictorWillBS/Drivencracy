import {db,objectId} from "../../dbStrategy/mongo.js"
import { postPoolSchema } from "../../schemas/postPoolSchema.js";
import validateSchema from "../../validateSchema/validateSchema.js";

export  async function createPool (req,res) {
    const newpool = req.body
    console.log(req.body)
    if(!newpool){
        return res.sendStatus(404)
    }
    try {
        if(validateSchema(postPoolSchema,newpool)){
            return res.sendStatus(422)
        }
        if(newpool.expireAt){
            await db.collection("pools").insertOne({...newpool})
        }else{
            console.log("usei novo expire")
            const trintaDiasEmMilisec = 86400000 *30
            const today = Date.now()
            const newDate = new Date(today+trintaDiasEmMilisec) 
            const day = newDate.getDate()<10? `0${newDate.getDate()}`:newDate.getDate()
            const month = newDate.getMonth()+1<10? `0${newDate.getMonth()+1}`:newDate.getMonth()+1
            const year = newDate.getFullYear()
            const newExpire= `${year}-${month}-${day} 23:59`

            console.log(newDate)
            console.log({...newpool,expireAt:newExpire})
            await db.collection("pools").insertOne({...newpool,expireAt:newExpire})
        }
        
        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500)
    }
}   