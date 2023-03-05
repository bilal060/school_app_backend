const generateOTP = async()=>{
    try {
       return  (otp = `${Math.floor(100 + Math.random() * 900)}`)
    } catch (error) {
        
        throw error
    }
}
module.exports = generateOTP