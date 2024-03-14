/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()
const Fine = require('../models/Fine')

// Create an item
router.post('/', async (req, res) => {
    try {
        const newFine = new Fine(req.body)
        await newFine.save()
        res.status(201).json(newFine)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Read all items
router.get('/', async (req, res) => {
    try {
        console.log('GET')
        const fines = await Fine.find()
        console.log(fines)
        res.json(fines)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// eslint-disable-next-line consistent-return
router.get('/:identifier', async (req, res) => {
    try {
        const fine = await Fine.findOne({ identifier: req.params.identifier })
        if (fine === null) {
            return res.status(404).json({ message: 'Fine not found' })
        }
        res.json(fine)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// Update an item
router.patch('/:id', async (req, res) => {
    // Implement update logic
})

// Delete an item
router.delete('/:id', async (req, res) => {
    // Implement delete logic
})

module.exports = router
