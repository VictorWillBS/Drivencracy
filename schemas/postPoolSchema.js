import joi from "joi";

export const postPoolSchema = joi.object({
    
    title: joi.string().required(),
    expireAt: joi.date().iso()

}) 