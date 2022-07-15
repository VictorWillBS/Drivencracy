import {db,objectId} from "../../dbStrategy/mongo.js"

export async function getChoices(req,res){
    const {id}= req.params
    const allChoices = await db.collection("choices").find({poolId:id}).toArray()
    try {
        res.status(200).send(allChoices)
    } catch (error) {
        res.status(500).send()
    }

}