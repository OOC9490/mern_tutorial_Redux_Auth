const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Item Model
const User = require('../../models/user');

// POST api/users/add
// register new user
// Public
router.post('/add', (request, response) => {
    const { name, email, password } = request.body;

    // Simple validation
    if(!name || !email || !password ){
        return response.status(400).json({ msg: 'Please enter all fields! (name, email, password)'});
    }

    // Check for existing user
    User.findOne({ email })
        .then( user => {
            if( user ){ return response.status(400).json({ msg: 'User is already in the system!'})};

            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt & hashing password
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash( newUser.password, salt, (error, hash) => {
                    if(error){throw error};
                    newUser.password = hash;
                    newUser.save()
                        .then( user => {
                            //creating the json web token
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                // token expires in an hour
                                { expiresIn: 3600},
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
                        });
                })
            });
        })
});


// give access to this file
module.exports = router;