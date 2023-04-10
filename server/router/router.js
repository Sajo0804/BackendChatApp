import express from 'express';
import jwt from 'jsonwebtoken';
import channelController from '../controller/channelController.js';
import userController from '../controller/userController.js';
const router = express.Router();

// API endpoints
router.get('/channel', authenticateToken, channelController.getChannels)
router.get('/channel/:id', authenticateToken, channelController.getChannel)
router.post('/channel/:id', authenticateToken, channelController.postChannel)
router.put("/channel", authenticateToken, channelController.createChannel);
router.delete('/channel/:id', authenticateToken, channelController.deleteChannel)
router.get("/logout/:id", userController.logout)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get("/allusers", userController.getAllUsers);
router.get("/broadcast")
router.post("/broadcast")

// Filter
function authenticateToken(req, res, next) {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1];
  
      if (token == null) return res.sendStatus(401)
  
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) return res.sendStatus(403)
          req.user = user;
          console.log(user)
          next()
      })
}
  
  export default router;


  