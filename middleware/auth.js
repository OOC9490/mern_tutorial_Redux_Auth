const config = require('config');
const jwt = require('jsonwebtoken');

// middleware functions always need to have these three parameters set up, next will cause the middleware to move onto the "next" middleware
function auth(request, response, next){
    const token = request.header('x-auth-token');

    // Check for a token
    if(!token) {
        return response.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        // Verify token
        const decoded = jwt.verify( token, config.get('jwtSecret') );
        // Add user from payload
        request.user = decoded;
        next();
    } catch(exception) {
        response.status(400).json( { msg: "Token is not valid!" } )
    }
}

module.exports = auth;