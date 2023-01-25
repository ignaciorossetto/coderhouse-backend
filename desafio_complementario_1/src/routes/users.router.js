import { Router } from "express";
import {
    createUser,
    logIn,
    logOut,
    privateView,
    checkLogIn
} from '../controllers/users.controller.js'
import { auth } from "./views.router.js";


const router = Router()

router.post('/', createUser)
router.post('/login', logIn)
router.get("/logout", logOut)
router.get("/check",auth, checkLogIn)
router.get("/private" ,privateView)





export default router;
