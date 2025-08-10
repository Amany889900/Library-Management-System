import joi from "joi";
import { generalRules } from "../../utils/index.js";

export const addBookSchema = {
    body:joi.object({
    title:joi.string().min(2).required(),
    author:joi.string().alphanum().min(2).required(),
    publishedYear:joi.date().required(),
    availableCopies:joi.number().positive().required(),
  }).required()
}

export const updateBookSchema = {
    body:joi.object({
    title:joi.string().min(2),
    author:joi.string().alphanum().min(2),
    publishedYear:joi.date(),
    availableCopies:joi.number().positive(),
  }).required(),
  params:joi.object({
    id:generalRules.id.required()
  }).required()
}

export const deleteBookSchema = {
  params:joi.object({
    id:generalRules.id.required()
  }).required()
}
