// server file

// node imports

import express from "express";
import bodyparser from "body-parser";
import path from "path"
import cors from "cors"
import "dotenv/config"

// our imports
import { router as compileapi } from "./routes/apiroutes.mjs"
import { router as viewroutes } from "./routes/viewroutes.mjs"
import { errorMiddleware } from "./middlewares/errormid.mjs";


// env constants

const app = express()
const port = process.env.PORT
const frontend = process.env.FRONTEND
const __dirname = path.resolve()


// origin settings
let corsOptions = {
    origin: frontend,
    optionSuccessStatus: 200
}

if (process.env.NODE_ENV == "dev") {

    app.disable("view cache")

}

// express prefixes middlewares
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())

// express custom middleware
app.set("view engine", "ejs")
app.set("views", [path.join(__dirname, "views")])
app.use(express.static(path.join(__dirname, "public")))

// middlewares
app.use(cors(corsOptions))
app.use(errorMiddleware)


// routes

app.use(compileapi)
app.use(viewroutes)



app.listen(port, (err) => {
    console.log(`http://127.0.0.1:${port}`)
})