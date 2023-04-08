const express = require(`express`)
const { body, validationResult } = require("express-validator")
const Contact = require(`../models/contacts`)
const router = express.Router()
const fetchUser = require(`../middleware/fetchuser`)
const { findByIdAndDelete } = require("../models/contacts")


//add pagination on here
router.get(`/getallcontacts`, fetchUser, async(req, res) => {
    try{

    }catch(error){
        
    }
})

//normal get method
router.get(`/getallcontactsnorm`, fetchUser, async(req, res) => {
    try{
        const data = await Contact.find({userId: req.user.id})
        res.json(data)
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//fetches contacts by name
router.get(`/getcontactbyname`, fetchUser, async(req, res) => {
    try{

    }catch(error){
        
    }
})

//fetches contacts by number
router.get(`/getcontactbynumber`, fetchUser, async(req, res) => {
    try{

    }catch(error){
        
    }
})

//creates a new contact
router.post(`/createcontact`, fetchUser, async(req, res) => {
    try{
        const errors  = validationResult(req)

        if (!errors.isEmpty())  return res.status(400).json({errors: errors.array()})

        var us, phno, add, email;
        if (req.body.user)  us = req.body.us 
        if (req.body.primaryNumber) phno = req.body.primaryNumber
        if (req.body.address)   add = req.body.address
        if (req.body.email) email = req.body.email 

        const use = new Contact({
            "userId": req.user.id,
            "name": us,
            "email": email,
            "phoneNumber": phno,
            "address": add
        })

        const saveContact = await use.save()
        res.json(saveContact)
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//update a contact
router.put(`/updatecontact/:id`, fetchUser, async(req, res) => {
    try{

    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//delete a contact
router.delete(`/deletecontact/:id`, fetchUser, async(req, res) => {
    try{
        const data = await Contact.findByIdAndDelete(req.params.id)
        res.json(data)
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

module.exports = router