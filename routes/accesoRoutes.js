const express = require("express");
const router = express.Router();

// GET Method
router.get('/', (req, res) => {
    res.json({ Estado: true });
});

module.exports = router;
