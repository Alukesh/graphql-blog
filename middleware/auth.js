const jwt = require('jsonwebtoken')


const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || ""

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.verifiedUser = verified
        console.log('Verification success!', verified);
        // res.json({ msg: 'Verification success!', verified });
        next()
    } catch (error) {
        console.log('Verification failed!');
        // res.json({ msg: 'Verification failed!', error }); 
        next()
    }
}


module.exports = { authenticate }