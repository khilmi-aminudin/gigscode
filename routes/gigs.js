const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req,res) => {
    db.gig.findAll()
        .then(gigs => {
            res.render('gigs',{
                gigs
            })
        })
        .catch(err => {
            console.error(err)
        });
})

router.get('/add', (req,res) => {
    res.render('add')
})

router.post('/add', (req,res) => {
    let {title,technologies,budget,description,contact_email} = req.body
    let errors = {}

    if(!title){
        errors.title = 'Please Add a Title'
    }
    if(!technologies){
        errors.technologies = 'Please Add a technologies'
    }
    if(!budget){
        errors.budget = 'Please Add a budget'
    }
    if(!description){
        errors.description = 'Please Add a description'
    }
    if(!contact_email){
        errors.contact_email = 'Please Add a contact_email'
    }

    const isError = Object.keys(errors).length === 0 && errors.constructor === Object

    if(!isError){
        res.render('add',{
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        })
    }else{
        if(!budget){
            budget = 'unknown'
        }else{
            budget = `$${budget}`
        }

        // Make lowercase and remove space after coma
        technologies = technologies.toLowerCase().replace(/, /g, ',')

        // insert into table
        db.gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        })
        .then(() => res.redirect('/gigs'))
        .catch(err => console.log(err))
    }

})

router.get('/search', (req,res) => {
    const { term } = req.query

    Gig.findAll({ where : { technologies : { [Op.like] : '%'+ term +'%'}}})
        .then(gigs => {
            res.render('gigs', {
                gigs
            })
        })
        .catch(err => console.log(err))
})


module.exports = router