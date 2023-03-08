export default class UserDTO {

  constructor(user) {
    this.name = user.name
    this.email = user.email
    this.admin = user.admin
    this.strategy = user.strategy
    this.carts = user.carts
  }

}