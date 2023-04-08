const express = require(`express`)
const User = require(`../models/user`)
const Contact = require(`../models/contacts`)
const router = express.Router()
const fetchUser = require(`../middleware/fetchuser`)


//add pagination here
router.get(`/getallcontacts`, async(req, res) => {

})

//fetches contacts by name
router.get(`/getcontactbyname`, async(req, res) => {

})

//fetches contacts by number
router.get(`/getcontactbynumber`, async(req, res) => {

})

//creates a new contact
router.post(`/createcontact`, async(req, res) => {

})

//update a contact
router.put(`/updatecontact/:id`, async(req, res) => {

})

//delete a contact
router.delete(`/deletecontact/:id`, async(req, res) => {

})

module.exports = router