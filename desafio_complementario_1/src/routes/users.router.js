import { Router } from "express";
import {
    createUser,
    logIn,
    logOut,
    checkLogIn,
    googleLoginCallback,
    modifyUser,
    googleFailedLogin,
    changePassword,
    getFakeUsers
} from '../controllers/users.controller.js'
import { passportCall } from "../utils.js";



const router = Router()

router.post('/', passportCall('register', {failureRedirect: '/register?register_status=failed', session: false}), createUser)
router.post('/login', passportCall('login',{failureRedirect: '/login?login_status=failed', session: false}), logIn)
router.get('/login/google', passportCall('google', {prompt : "select_account", session: false}), (req,res)=>{})
router.get('/login/google/callback', passportCall('google',{failureRedirect: '/api/users/login/google/callback/failed', session: false}), googleLoginCallback)
router.get('/login/google/callback/failed', googleFailedLogin)
router.get("/logout",passportCall('jwt'), logOut)
router.get("/check",passportCall('jwt'), checkLogIn)
router.put("/changePassword",passportCall('jwt'), changePassword)
router.post("/modify/:id",passportCall('jwt'), modifyUser)
router.get('/fakerjs', getFakeUsers)



export default router;
