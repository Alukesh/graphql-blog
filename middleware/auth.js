const jwt = require('jsonwebtoken')


const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || ""

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.verifiedUser = verified.user
        console.log('Verification success!', verified);
        next()
    } catch (error) {
        console.log('Verification failed!');
        next()
    }
}


module.exports = { authenticate }