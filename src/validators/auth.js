 require('dotenv').config({ path: '../.env' })

const auth = async (req, res, next) => {
    
    try {
    
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token)
        

        if (token !== process.env.TOKEN) {
            throw new Error()
        }

        next()
    }catch (e) {
        res.status(401).json({status: 'error', msg: e, error: 'You have no access. Please get the token'})
    }
}

module.exports = auth