import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

export const createUser = async(req,res) => {
    try {
        const userData = req.body
        userData.password = createHash(userData.password)
        const response = await userModel.create(userData)
        res.redirect('http://localhost:5000/login?register=success')
    } catch (error) {
        const key = Object.keys(error.keyValue)
        console.log(key);
        res.redirect(`http://localhost:5000/register?status=failed&key=${key[0]}`)
    }
}
export const logIn = async(req,res) => {
    const {name, password} = req.body
    try {
        const user = await userModel.findOne({name})
        if(!user){
            res.render(`../views/errors/base`, {error: 'No se puedo logear, usuario y/o password incorrecta.'})
            return
        }
        if(!isValidPassword(user, password)){
            res.render(`../views/errors/base`, {error: 'No se puedo logear, usuario y/o password incorrecta.'})
            return
        }
        delete user.password
        req.session.user = user
        res.redirect(`http://localhost:5000/products?login_status=success&name=${name}`)
    } catch (error) {
        res.render(`/errors/base`, {error: 'Hubo un problema! Lo estamos solucionando.'})
            return
         
    }
}


export const logOut = async(req,res) => {
    try {
        req.session.destroy(err=>{
            if (err) {
                res.render(`../views/errors/base`, {error: 'No se puedo logear, usuario y/o password incorrecta.'})
                return
            }
        })
        return res.redirect(`http://localhost:5000/products?logout_status=success`)
    } catch (error) {
        res.render(`/errors/base`, {error: 'Hubo un problema! Lo estamos solucionando.'})
            return
         
    }
}
export const privateView = async(req,res) => {
    try {
        res.json({status: 'logged in'})
    } catch (error) {
        res.render(`/errors/base`, {error: 'Hubo un problema! Lo estamos solucionando.'})
            return
         
    }
}
export const checkLogIn = async(req,res) => {
    try {
        res.json({status: 'logged in'})
    } catch (error) {
        res.render(`/errors/base`, {error: 'Hubo un problema! Lo estamos solucionando.'})
            return
         
    }
}