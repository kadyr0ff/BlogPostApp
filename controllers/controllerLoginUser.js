const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const {username, password} = req.body;

    User.findOne({username: username}, (error, user) => {
        if (error) {
            const validationErrors = Object.keys(error).map(key => error[key].message)
            req.flash('validationErrors', validationErrors)
            req.flash('data', req.body)
            console.log('Error is: ' + error)
            res.redirect('/auth/login')
            console.log('1231')
        }
        if (!user) {
            const validationErrors = Object.keys({username}).map(key => 'User not found')
            req.flash('validationErrors', validationErrors)
            req.flash('data', req.body)
            res.redirect('/auth/login')

        }
        else if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    res.redirect('/')
                }
                if(!same) {
                    const validationErrors = Object.keys({password}).map(key => 'Invalid credentials')
                    req.flash('validationErrors', validationErrors)
                    req.flash('data', req.body)
                    res.redirect('/auth/login')
                }
            })
        }
    })
}