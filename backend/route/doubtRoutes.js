const express = require('express');
const doubtController = require('../controllers/doubtController');
const { authenticate,invalidatedTokens  } = require('../utils/authentication');
const router = express.Router();

router.post('/create', authenticate, doubtController.createDoubt);
router.get('/history', authenticate, doubtController.getDoubtHistory);

router.put('/edit/:doubtId', doubtController.editDoubt);


router.delete('/delete/:doubtId', doubtController.deleteDoubt);

router.post('/logout', authenticate, (req, res) => {
    try {
        const token = req.cookies.token;
    
      
        if (invalidatedTokens.includes(token)) {
          return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        }
    
     
        invalidatedTokens.push(token);
    
      
        res.clearCookie('token');
    
        res.json({ message: 'Logout successful' });
      } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


module.exports = router;
