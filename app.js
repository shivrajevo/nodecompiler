// server file

// node imports

import express from "express";
import bodyparser from "body-parser";
import path from "path"
import cors from "cors"
import "dotenv/config"


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

if (process.env.NODE_ENV === "dev") {

    app.disable("view cache")

}

// express prefixes middlewares
app.set("view engine", "ejs")
app.set("views", [path.join(__dirname, "views")])
app.use(express.static(path.join(__dirname, "public")))

app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())

// middlewares
app.use(cors(corsOptions))

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})