import express from 'express'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// Get farmer profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.json({ message: 'Farmer profile', userId: req.user.id })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router