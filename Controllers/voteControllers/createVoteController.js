
import {db,objectId} from "../../dbStrategy/mongo.js"

export async function createVote (req,res){
    const {id} = req.params;
    
    const choice = await db.collection("choices").findOne({_id:objectId(id)})
    if(!choice){
        return res.status(404).send("opção não encontrada")
    }
    const {poolId}= choice
    const pool = await db.collection("pools").findOne({_id:objectId(poolId)})

    const newExpireat = pool.expireAt.slice(0,10).split("-",3).join("/")
    const dateValidToMilisec = Date.parse(newExpireat);
    const todayMilisex = Date.now()
    
    if(dateValidToMilisec<todayMilisex){
        return res.status(403).send()
    }
    const jaFoiVotado = await db.collection("votes").findOne({"choice.choiceId":objectId(id)})
       try {
        if(jaFoiVotado){
            const votoAtualizado = jaFoiVotado.choice.vote +1
            await db.collection("votes").updateOne({"choice.choiceId":objectId(id)},{$set:{"choice.vote":votoAtualizado}})
            return res.status(200).send()
        }
        const voto={
            poolTitle:pool.title,
            poolId,
            choice:{title:choice.title,
                    choiceId: choice._id,
                    vote:1}
            }
        await db.collection("votes").insertOne({...voto})
        return res.status(201).send(jaFoiVotado)
    } catch (error) {
        return res.status(500).send()
    }
}