import joi from "joi";

export const postChoiceSchema = joi.object({
    
    title: joi.string().required(),
    poolId: joi.string().required()

}) 

