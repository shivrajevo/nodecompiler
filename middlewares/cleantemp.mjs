import asyncHandler from 'express-async-handler'
import { flush } from "compilex";

let currentfiles = 0

const tempdelete = asyncHandler(async (req, res, next) => {

    currentfiles++

    if (currentfiles > process.env.CLEAR_AT) {

        flush(() => {


            if (process.env.NODE_ENV == "dev") {
                console.log(`tempfiles cleared at : ${currentfiles}`)
            }

            currentfiles = 0
        })

        next()

    } else {

        next()
    }

})

export { tempdelete }