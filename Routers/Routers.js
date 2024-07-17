const app = require('express')
const { CreateVisa, getAllVisa, singleDeleteVisa, searchVisa } = require('../controllers/visa.Controller')
const upload = require('../Multer/Multer')
const router = app.Router()

router.post('/createVisa',upload.single('pdf'),CreateVisa)
router.get('/getAllVisa',getAllVisa)
router.delete('/singleDeleteVisa/:id',singleDeleteVisa)
router.post('/searchVisa',searchVisa)

module.exports = router