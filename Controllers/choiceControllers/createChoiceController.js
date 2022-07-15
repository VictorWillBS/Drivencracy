import {db,objectId} from "../../dbStrategy/mongo.js"
import { postChoiceSchema } from "../../schemas/postChoiceSchema.js";
import validateSchema from "../../validateSchema/validateSchema.js";


export async function createChoice(req,res){
    const choiceBody= req.body
    const {title,poolId} = choiceBody
    if(validateSchema(postChoiceSchema,choiceBody)){
        return res.sedStatus(422)
    }
    const poolExiste =  await db.collection("pools").findOne({_id:objectId(poolId)})
    if(!poolExiste){
        return res.status(404).send("enquente não encontrada")
    }
    console.log(poolExiste.expireAt)
    const newExpireat = poolExiste.expireAt.slice(0,10).split("-",3).join("/")
    console.log(newExpireat)
    const dateValidToMilisec = Date.parse(newExpireat);
    const todayMilisex = Date.now()
    if(dateValidToMilisec<todayMilisex){
        return res.status(403).send()
    }
    const choiceJaExiste= await db.collection("choices").findOne({poolId, title})
    if(choiceJaExiste){
        console.log(choiceJaExiste)
        return res.status(409).send("alternativa já existe")
    }

    try {
        await db.collection("choices").insertOne({...choiceBody})
        res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
   
   
}