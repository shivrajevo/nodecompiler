import asyncHandler from "express-async-handler"



const homepage = asyncHandler(

    async (req, res) => {
        try {

            res.status(200).render("index")

        } catch (err) {
            res.status(500).json(err)
        }
    }
)

export { homepage }


