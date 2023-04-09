const express = require(`express`)
const { body, validationResult } = require("express-validator")
const Contact = require(`../models/contacts`)
const router = express.Router()
const fetchUser = require(`../middleware/fetchuser`)
const { findByIdAndDelete } = require("../models/contacts")


//add pagination on header  --> works
router.get(`/getallcontacts`, fetchUser, async(req, res) => {
    try{
        const limitValue = req.query.limit || 2;
        const skipValue = req.query.skip || 0;
        const data = await Contact.find({userId: req.user.id}).limit(limitValue).skip(skipValue);

        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//normal get method --> works
router.get(`/getallcontactsnorm`, fetchUser, async(req, res) => {
    try{
        const data = await Contact.find({userId: req.user.id})
        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//fetches contacts by name  --> works
router.post(`/getcontactbyname`, fetchUser, async(req, res) => {
    try{
        let data = await Contact.findOne({userId: req.user.id, name: req.body.name})
        if (!data)  res.status(404).send("Not Found")

        // data = await data.findOne({name: req.body.name})

        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//fetches contacts by number --> works
router.post(`/getcontactbynumber`, fetchUser, async(req, res) => {
    try{
        let data = await Contact.findOne({userId: req.user.id, phoneNumber: req.body.phoneNumber})
        if (!data)  res.status(404).send("Not Found")

        //data = await data.findOne({phoneNumber: req.body.phoneNumber})

        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//creates a new contact  --> works
router.post(`/createcontact`, fetchUser, async(req, res) => {
    try{
        
        console.log(`running`)
        const errors  = validationResult(req)

        if (!errors.isEmpty())  return res.status(400).json({errors: errors.array()})
        
        let data = {}
        data["userId"] = req.user.id
        if (req.body.name)   data["name"]    =   req.body.name
        if (req.body.phoneNumber)    data["phoneNumber"] =   req.body.phoneNumber
        if (req.body.email)  data["email"]   =   req.body.email
        if (req.body.address)    data["address"] =   req.body.address

        const use = new Contact(data)

        const saveDet = await use.save()
        res.status(200).json(saveDet);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//update a contact --> works
router.put(`/updatecontact/:id`, fetchUser, async(req, res) => {
    try{
        const {name, phoneNumber, email, address} = req.body
        let data = await Contact.findById(req.params.id)

        if (!data)  res.status(404).send(`Not Found`)

        if (name)   data["name"]    =   name
        if (phoneNumber)    data["phoneNumber"] =   phoneNumber
        if (email)  data["email"]   =   email
        if (address)    data["address"] =   address
        
        data = await Contact.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: data},
            {new: true}
        )

        res.status(200).json(data)

    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

//delete a contact --> works
router.delete(`/deletecontact/:id`, fetchUser, async(req, res) => {
    try{
        const data = await Contact.findByIdAndDelete(req.params.id)

        if (!data)  res.status(404).send(`Internal Server Error`)

        res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).send(`Internal Server Error`)
    }
})

module.exports = router