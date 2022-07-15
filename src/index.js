import express,{json}from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk"
import { getPools } from "../Controllers/poolControllers/getPoolController.js";
import {createPool} from '../Controllers/poolControllers/createPoolCrontroller.js'
import {createChoice} from '../Controllers/choiceControllers/createChoiceController.js'
import {getChoices} from '../Controllers/choiceControllers/getChoicesController.js'
import {createVote} from '../Controllers/voteControllers/createVoteController.js'
import {getResult} from '../Controllers/poolResultController/poolResultController.js'

dotenv.config()
const app = express();
app.use(json());
app.use(cors());


// Auth Route 
app.post("/pool",createPool)
app.get("/pool",getPools)

app.post("/choice",createChoice)
app.get("/pool/:id/choice",getChoices)

app.post("/choice/:id/vote",createVote)
app.get("/pool/:id/result",getResult)


app.listen(5000,()=>{
    console.log(chalk.green("Servidor Funcionando"))
})