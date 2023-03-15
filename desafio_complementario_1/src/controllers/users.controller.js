import { createHash, generateToken, isValidPassword } from "../utils.js";
import { UserService, CartService } from "../repository/index.js";
import CustomError from "../services/errors/customError.js";
import { generateUser } from "../config/faker.js";


export const createUser = async (req, res) => {
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
  res.redirect("http://localhost:5000/login?register=success");
};

export const logIn = async (req, res) => {
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
  if (!req.user) return CustomError.createError({
    name: "Invalid Credentials",
    code: 4,
    status: 401,
    message: "Invalid credentials, login to access."
  })
  let user = { ...req.user };
  delete user._doc.password;
  const access_token = generateToken(user);
  res
    .cookie("coderCookieToken", access_token)
    .redirect(
      `http://localhost:5000/products?login_status=success&name=${req.body.email}`
    );
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("coderCookieToken");
    res.redirect(`http://localhost:5000/login?logout_status=success`);
    return;
  } catch (error) {
    res.render(`/errors/base`, {
      error: "Hubo un problema! Lo estamos solucionando.",
    });
    return;
  }
};

export const privateView = async (req, res) => {
  // try {
  //     res.json({status: 'logged in'})
  // } catch (error) {
  //     res.render(`/errors/base`, {error: 'Hubo un problema! Lo estamos solucionando.'})
  //         return
  // }
};

export const checkLogIn = async (req, res) => {
  const user = await UserService.getOne({ _id: req.user.user._doc._id });
  delete user._doc.password;
  req.user = user._doc;
  let currentCart = req.user.carts.find((c) => c.confirmed === false);
  if (!currentCart) {
    const newCart = await CartService.create({});
    await UserService.update(
      user._doc._id,
      { $push: { carts: { cart: newCart._id, confirmed: false } } }
    );
    currentCart = req.user.carts.find((c) => c.confirmed === false);
  }
  try {
    res.json({ user: { ...req.user, currentCart } });
  } catch (error) {
    res.render(`/errors/base`, {
      error: "Hubo un problema! Lo estamos solucionando.",
    });
    return;
  }
};

export const googleLoginCallback = async (req, res) => {
  try {
    if (!req.user) return CustomError.createError({
      name: "Invalid credentials",
      code: 4,
      status: 401,
      message: "Las credenciales no son validas",
      cause: 'Bad request'
    })
    let user = { ...req.user };
    delete user._doc.password;
    const access_token = generateToken(user);
    res
      .cookie("coderCookieToken", access_token)
      .redirect(`http://localhost:5000/products?login_status=success`);   
  } catch (error) {
    next(error)
  }
};

export const googleFailedLogin = async (req, res) => {
  res.redirect(`http://localhost:5000/login?login_status=Gfailed`);
};

export const modifyUser = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const response = await UserService.update(id, obj);
    res.json({ user: response, status: "success" });
  } catch (error) {
    next(CustomError.createError({
      name: "Cart not updated",
      code: 4,
      status: 500,
      message: "Could not update the cart",
      cause: 'Server Error'
    }))
  }
};

export const changePassword = async (req, res, next) => {
  const { currentPass, newPass } = req.body;
  const email = req.user.user._doc.email;
  try {
    const user = await UserService.getOne({ email });
    if (!user) {
      CustomError.createError({
        name: "Invalid Credentials",
        code: 4,
        status: 401,
        message: "User not found",
        cause: ''
      })
      return;
    }
    if (user.strategy !== "local") {
      console.log('aca');
      CustomError.createError({
          name: "error",
          code: 4,
          status: 404,
      message: "Los usuarios creados con google no pueden cambiar la contrasena",
      cause: "Los usuarios creados con google no pueden cambiar la contrasena"
    })
    return
  }
  if (!isValidPassword(user, currentPass)) {
    CustomError.createError({
      name: "error",
      code: 4,
      status: 404,
      message: "La contrasena actual es incorrecta"
    })
    return;
  }
  } catch (error) {
    return next(error)
  }

  const hashedPass = createHash(newPass);
  try {
    await UserService.update(
      user._id ,
      { password: hashedPass }
      );
      res.redirect("/private?passwordchange=success");
      
    } catch (error) {
      next(CustomError.createError({
        name: "Password not changed",
        code: 4,
        status: 500,
        message: "Could not change the password",
        cause: 'Server Error'
      }))
    }
};
  
export const confirmedSale = async (req, res) => {
  try {
    const id = req.params.id;
    const newCart = await CartService.create({});
    const response = await UserService.update( id , obj);
    res.redirect("/products");
  } catch (error) {
    next(CustomError.createError({
      name: "Sale not confirmed",
      code: 4,
      status: 500,
      message: "Could not complete the sale",
      cause: 'Server Error'
    }))
  }
};

export const getFakeUsers = async(req,res) => {
    const users = []
    
    for (let i = 0; i < 10; i++) {
      users.push(generateUser())
    }

    res.json({
      status:'success',
      payload: users
    })
}
