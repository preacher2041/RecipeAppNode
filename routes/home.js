const express = require('express');
const router = express.Router();

// Recipes home
router.get('/', (req, res) => {
	res.send('Welcome to recipes app');
});

module.exports = router;