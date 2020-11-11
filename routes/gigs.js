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
    db.gig.findAll()
    .then(gigs => {
        res.render('gigs',{
            gigs
        })
    })
    .catch(err => {
        console.error(err)
    })
})

// Add a gig form
router.get('/add', (req,res) => {
    res.render('add')
})

// Add a gig
router.post('/add', (req,res) => {

    let {title,technologies,budget,description,contact_email} = req.body
    let errors = {}

    // validate fields
    if(!title){
        errors.title =  'Please add a title'
    }
    if(!technologies){
        errors.technologies = 'Please add some technologies'
    }
    if(!description){
        errors.description = 'Please add a description'
    }
    // if(!budget){
    //     errors.budget = 'Please add the budget'
    // }
    if(!contact_email){ 
        errors.contact_email = 'Please add a contact_email'
    }

    const isEmptyErrors = Object.keys(errors).length === 0 && errors.constructor === Object
    // check for errors
    if(!isEmptyErrors){
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

// Search a Gigs
router.get('/search', (req,res) => {
    const { term } = req.query

    db.gig.findAll({ where : { technologies : { [Op.like] : '%'+ term +'%'}}})
        .then(gigs => {
            res.render('gigs', {
                gigs
            })
        })
        .catch(err => console.log(err))
})

module.exports = router