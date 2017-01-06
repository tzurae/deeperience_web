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

// guide agree to plan
customize.post('/ranklist/agree', userController.agreePlan) // todo

// get video time
customize.get('/videotime', userController.getVideoTime)    // todo

// guide create many video time
customize.post('/videotime/create', userController.createVideoTime) // todo

// user accept video time
customize.post('/videotime/accept', userController.acceptVideoTime) // todo

// user send evaluation
customize.post('/evaluation', userController.sendEvaluation) // todo

export default customize
