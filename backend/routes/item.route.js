import express from "express";
import { addItem } from '../controllers/item.controller.js'

const itemRouter = express.Router();
itemRouter.post("/add", addItem);

export default itemRouter;
