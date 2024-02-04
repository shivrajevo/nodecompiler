import { compileCPP, compileCPPWithInput, compilePython, compilePythonWithInput, init } from "compilex";
import asyncHandler from "express-async-handler"

if (process.env.NODE_ENV === "dev") {

    init({ stats: true })
}

const responser = function (data, res) {

    if (data.output) {
        res.status(200).json(data)
    }
    else if (data.error) {

        res.status(200).json(data)

    } else {
        res.status(200).json({ error: "invalid code" })

    }
    
}

const compiler = asyncHandler(

    async (req, res) => {

        const code = req.body.code;
        const inputs = req.body.input;
        const langmode = req.body.langmode

        let envData = undefined

        if (inputs && process.env.NODE_ENV === "dev") {
            console.log("inputs : yes")
        }
        try {

            switch (langmode) {
                case "python":
                    envData = { OS: process.env.OS }

                    if (inputs) {

                        compilePythonWithInput(envData, code, inputs, (data) => {
                            responser(data, res)
                        })

                    }
                    else {

                       
                        compilePython(envData, code, (data) => {

                            responser(data, res)

                        })

                    }

                    break;

                case "c_cpp":

                    if (process.env.OS == "windows") {

                        envData = { OS: process.env.OS, cmd: "g++", options: { timeout: 5000 } }
                    }
                    else {
                        envData = { OS: process.env.OS, cmd: "gcc", options: { timeout: 5000 } }


                    }

                    if (inputs) {

                        compileCPPWithInput(envData, code, inputs, (data) => {
                            responser(data, res)
                        })
                    }
                    else {
                        compileCPP(envData, code, (data) => {
                            responser(data, res)
                        })

                    }
                    break;

                default:
                    res.status(404).json({ error: "unsuported language code" })
                    break;
            }

        }
        catch (err) {
            res.status(404).json(err)
        }

    }
)


export { compiler }