import { userModel } from "../dao/models/user.model.js";
import { createHash, generateToken, isValidPassword } from "../utils.js";
import { cartModel } from "../dao/models/carts.model.js";

export const createUser = async(req,res) => {
    // try {
    //     const userData = req.body
    //     userData.password = createHash(userData.password)
    //     const response = await userModel.create(userData)
    //     res.redirect('http://localhost:5000/login?register=success')
    // } catch (error) {
    //     const key = Object.keys(error.keyValue)
    //     console.log(key);
    //     res.redirect(`http://localhost:5000/register?status=failed&key=${key[0]}`)
    // }
        // const response = await addCart()
        res.redirect('http://localhost:5000/login?register=success')

}
export const logIn = async(req,res) => {
    // const {name, password} = req.body
    // try {
    //     const user = await userModel.findOne({name})
    //     if(!user){
    //         res.render(`../views/errors/base`, {error: 'No se puedo logear, usuario y/o password incorrecta.'})
    //         return
    //     }
    //     if(!isValidPassword(user, password)){
    //         res.render(`../views/errors/base`, {error: 'No se puedo logear, usuario y/o password incorrecta.'})
    //         return
    //     }
    //     delete user.password
    //     req.session.user = user
    //     res.redirect(`http://localhost:5000/products?login_status=success&name=${name}`)
    // } catch (error) {
    //     res.render(`/errors/base`, {error: 'Hubo un problema! Lo estamos solucionando.'})
    //         return
         
    // }
    if(!req.user) return res.status(401).send('Invalid credentials')
    let user = {...req.user}
    delete user._doc.password
    const access_token = generateToken(user)
    res.cookie('coderCookieToken', access_token).redirect(`http://localhost:5000/products?login_status=success&name=${req.body.email}`)
}


export const logOut = async(req,res) => {
    try {
        req.session.destroy(err=>{
            if (err) {
                res.clearCookie('coderCookieToken')
                res.render(`../views/errors/base`, {error: 'No se puedo logear, usuario y/o password incorrecta.'})
                return
            }
            res.redirect(`http://localhost:5000/login?logout_status=success`)
            return
        })
        
    } catch (error) {
        res.render(`/errors/base`, {error: 'Hubo un problema! Lo estamos solucionando.'})
            return
         
    }
}
export const privateView = async(req,res) => {
    // try {
    //     res.json({status: 'logged in'})
    // } catch (error) {
    //     res.render(`/errors/base`, {error: 'Hubo un problema! Lo estamos solucionando.'})
    //         return
         
    // }
}
export const checkLogIn = async(req,res) => {
    const user = await userModel.findOne({_id: req.user.user._doc._id})
    delete user._doc.password
    req.user = user._doc
    let currentCart = req.user.carts.find(c=>c.confirmed === false)
    if(!currentCart){
        const newCart = await cartModel.create({})
        await userModel.findByIdAndUpdate({_id: user._doc._id}, {$push: {carts: {cart: newCart._id, confirmed: false}}})
        currentCart = req.user.carts.find(c=>c.confirmed === false)
    }
    try {
        res.json({user: {...req.user, currentCart}})
    } catch (error) {
        res.render(`/errors/base`, {error: 'Hubo un problema! Lo estamos solucionando.'})
            return
         
    }
}


export const googleLoginCallback = async (req,res) => {
    if(!req.user) return res.status(401).send('Invalid credentials')
    let user = {...req.user}
    delete user._doc.password
    const access_token = generateToken(user)
    res.cookie('coderCookieToken', access_token).redirect(`http://localhost:5000/products?login_status=success`)
}

export const googleFailedLogin = async(req,res) => {
    res.redirect(`http://localhost:5000/login?login_status=Gfailed`)
}

export const modifyUser = async(req,res) => {
    try {
        const id = req.params.id
        const obj = req.body;
        const response = await userModel.findByIdAndUpdate({ _id: id }, obj);
        res.json({ user: response, status: "success" });
      } catch (error) {
        res.status(404).json({ message: "Error updating cart", error: error });
      }
}
export const changePassword = async(req,res) => {
        const {currentPass, newPass} = req.body;
       const email = req.user.user._doc.email
        const user = await userModel.findOne({email})
        if(!user){
            res.json({
                errorCode: 0,
                msg: 'Usuario no encontrado'})
            return
        }
        if(user.strategy !== 'local'){
            res.json({
                errorCode: 2,
                msg: 'Los usuarios que generaron su cuenta a traves de google no pueden cambiar la contrasena.'})
            return
        }
        if(!isValidPassword(user, currentPass)){
            res.json({
                errorCode: 3,
                msg: 'La contrasena actual es incorrecta'})
            return
        }
        const hashedPass = createHash(newPass)
        await userModel.findByIdAndUpdate({_id: user._id}, {password: hashedPass})
        res.redirect('/private?passwordchange=success')

}

export const confirmedSale = async(req,res) => {
    try {
        const id = req.params.id;
        const newCart = await cartModel.create({})
        const response = await userModel.findByIdAndUpdate({ _id: id }, obj)
        res.redirect('/products')
    } catch (error) {
        
    }
}