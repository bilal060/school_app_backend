const bcrypt = require("bcrypt");

//pass hashed
const hashData = async (data, saltRound = 10) => {
  try {
    const hasedData = await bcrypt.hash(data, saltRound);
    return hasedData;
  } catch (error) {
    throw error;
  }
}

  //pass unhashed

  const verifyHashedData = async(unhashed , hashed)=>{

    try {

      const match = await bcrypt.compare(unhashed,hashed)
      return match
      if(match === false){
        console.log('Password not Match ')
      }
    } catch (error) {
      throw error
    }
  }




module.exports = {  hashData, verifyHashedData}