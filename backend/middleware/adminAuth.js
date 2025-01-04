import jwt from 'jsonwebtoken'

const adminAuth=async(req,res,next)=>{
    try {
const {token}=req.headers       
if(!token)
    {
        return res.status(404).json({
            success:false,
            message:"cannot login , login again"
        })
    } 
const match=jwt.verify(token,process.env.JWT_SECRET)
if(match!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)
{
    return res.status(404).json({
        success:fasle,
        message:"email or password is incorrect"
    })
}
next()
}catch(error) 
{
   return res.status(500).json({
    success:false,
    message:"not authorized"
   })     
}

}

export default adminAuth