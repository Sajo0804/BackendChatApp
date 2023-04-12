import express from 'express';
import jwt from 'jsonwebtoken';
import channelController from '../controller/channelController.js';
import broadcastController from '../controller/broadcastController.js'
import userController from '../controller/userController.js';
const router = express.Router();

// API endpoints
router.get('/channel', channelController.getChannels);
router.get('/channel/:id', channelController.getChannel);
router.post('/channel/:id', channelController.postChannel);
router.put("/channel", channelController.createChannel);
router.delete('/channel/:id&:createdby', channelController.deleteChannel);
router.get("/logout/:id", userController.logout);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get("/allusers", userController.getAllUsers);
router.get("/broadcast", broadcastController.getBroadcast);
router.post("/broadcast", authenticateToken, broadcastController.postBroadcast);

// Filter
function authenticateToken(req, res, next) {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1];

      if (token == null) return res.sendStatus(401)
  
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) return res.sendStatus(403)
          req.user = user;
          next()
      })
}
  
export default router;


  