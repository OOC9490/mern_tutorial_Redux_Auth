const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item Model
const User = require('../../models/user');

// POST api/auth
// Authenticate new user
// Public
router.post('/', (request, response) => {
    const { email, password } = request.body;

    // Simple validation
    if( !email || !password ){
        return response.status(400).json({ msg: 'Please enter all fields! (name, email, password)'});
    }

    // Check for existing user
    User.findOne({ email })
        .then( user => {
            if( !user ){ return response.status(400).json({ msg: 'User is not in the system!'})};


            // validate password
            bcrypt.compare( password, user.password )
                .then(isMatch => {
                    if(!isMatch){ return response.status(400).json({ msg: 'Invalid crendetials.' })};

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        // token expires in an hour
                        { expiresIn: 3600 },
                        (error, token) => {
                            if(error){ throw error };

                            response.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
});

// Validate user with token
// GET api/auth/user
// GET  user
// Private (requires authentication)
router.get('/user', auth, (request, response) => {
    User.findById(request.user.id)
        .select('-password') //disregard password
        .then( user => response.json(user));
})


// give access to this file
module.exports = router;