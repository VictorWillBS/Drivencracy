import {db,objectId} from "../../dbStrategy/mongo.js"

export async function getResult(req,res){
    const {id} = req.params;
    const pool = await db.collection("pools").findOne({_id:objectId(id)})
    if(!pool){
        return res.status(404).send("enquete não encotrada")
    }
    const allVotes = await db.collection("votes").find({poolId:id}).toArray()
    const higherVoted = allVotes.reduce((prev,current)=>{
        return (prev.choice.vote >current.choice.vote? prev:current)})
    
    const result = {
        ...pool,result:{
            title: higherVoted.choice.title,
		    votes: higherVoted.choice.vote
        }
    }

    try {
        res.status(200).send(result)
    } catch (error) {
        res.sendStatus(500)
    }
}