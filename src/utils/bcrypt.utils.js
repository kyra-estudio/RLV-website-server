const bcrypt = require ("bcrypt")

encrypt = async(password)=>{
    return await bcrypt.hash(password, 10)

}
const compare = async function (plainPassword, password) {
    return bcrypt.compare(plainPassword, password)
  }

  
module.exports = {
    encrypt,
    compare
}