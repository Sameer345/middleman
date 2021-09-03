const express = require('express')
const router = express.Router()
const journalController = require('../controller/journalEntriesController')
router.post('/posting',journalController.posting)
router.get('/journalEntries/:_id', journalController.Entries)
router.get('/ledger/:_id',journalController.Ledger_List)
module.exports = router;