const express = require("express")
const { home, aggUser, getUser, editUser, deleteUser, addTranfer, getTranfer } = require( "../scripts/controller.js")

const router = express.Router();

router.get("/", home)

router.post("/usuario", aggUser)
router.get("/usuarios", getUser)
router.put('/usuario', editUser)
router.delete('/usuario', deleteUser)
router.post('/transferencia', addTranfer)
router.get('/transferencias', getTranfer)

module.exports = router


