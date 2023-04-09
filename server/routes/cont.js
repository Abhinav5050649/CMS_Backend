const express = require(`express`)
const { body, validationResult } = require("express-validator")
const Contact = require(`../models/contacts`)
const router = express.Router()
const fetchUser = require(`../middleware/fetchuser`)
const { findByIdAndDelete } = require("../models/contacts")


//add pagination on here
router.get(`/getallcontacts`, fetchUser, async(req, res) => {
    try{
        const limitValue = req.query.limit || 2;
        const skipValue = req.query.skip || 0;
        const data = await Contact.find().limit(limitValue).skip(skipValue);

        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//normal get method
router.get(`/getallcontactsnorm`, fetchUser, async(req, res) => {
    try{
        const data = await Contact.find({userId: req.user.id})
        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//fetches contacts by name
router.get(`/getcontactbyname`, fetchUser, async(req, res) => {
    try{
        let data = await Contact.find({userId: req.user.id})
        if (!data)  res.status(404).send("Not Found")

        data = await Contact.findOne({"name": req.body.name})

        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//fetches contacts by number
router.get(`/getcontactbynumber`, fetchUser, async(req, res) => {
    try{
        let data = await Contact.find({userId: req.user.id})
        if (!data)  res.status(404).send("Not Found")

        data = await Contact.findOne({"phoneNumber": req.body.phoneNumber})

        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//creates a new contact
router.post(`/createcontact`, fetchUser, async(req, res) => {
    try{
        const errors  = validationResult(req)

        if (!errors.isEmpty())  return res.status(400).json({errors: errors.array()})

        const {name, phoneNumber, email, address} = req.body
        let data = {}
        data["userId"] = req.user.id
        if (name)   data["name"]    =   name
        if (phoneNumber)    data["phoneNumber"] =   phoneNumber
        if (email)  data["email"]   =   email
        if (address)    data["address"] =   address

        const use = new Contact(data)

        const saveContact = await use.save()
        res.status(200).json(saveContact);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//update a contact
router.put(`/updatecontact/:id`, fetchUser, async(req, res) => {
    try{
        const {name, phoneNumber, email, address} = req.body
        let data = await Contact.findById(req.user.id)

        if (name)   data["name"]    =   name
        if (phoneNumber)    data["phoneNumber"] =   phoneNumber
        if (email)  data["email"]   =   email
        if (address)    data["address"] =   address
        
        data = await Contact.findByIdAndUpdate(
            {id: req.user.id},
            {$set: data},
            {new: true}
        )

        res.status(200).json(data)

    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//delete a contact
router.delete(`/deletecontact/:id`, fetchUser, async(req, res) => {
    try{
        const data = await Contact.findByIdAndDelete(req.params.id)
        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

module.exports = router