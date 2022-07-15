import {db,objectId} from "../../dbStrategy/mongo.js"
import { postPoolSchema } from "../../schemas/postPoolSchema.js";
import validateSchema from "../../validateSchema/validateSchema.js";

export async function getPools(req,res){
    const allPools = await db.collection("pools").find({}).toArray()

    res.status(200).send(allPools)
}