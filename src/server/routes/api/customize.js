import express from 'express'
import userController from '../../controllers/user'

const customize = express.Router()


// get current customizePhase
customize.get('/phase/:userId', userController.getCustomizePhase)    // todo

// go into next customizePhase
customize.post('/phase/:userId', userController.nextCustomizePhase)  // todo

// get guide rank list(for user)
customize.get('/ranklist/:userId', userController.getRankList)  // todo

// create guide rank list(for user)
customize.post('/ranklist/:userId', userController.createRankList)  // todo

export default customize