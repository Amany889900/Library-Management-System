import { generalRules } from "../../utils/index.js";
import joi from "joi"

export const borrowTransactionSchema = {
    body:joi.object({
       bookId:generalRules.id.required(),
    }).required(),
}