const generateOTP = async()=>{
    try {
       return  (otp = `${Math.floor(1000 + Math.random() * 900)}`)
    } catch (error) {
        
        throw error
    }
}
module.exports = generateOTP 