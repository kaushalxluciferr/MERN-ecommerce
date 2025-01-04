import jwt from 'jsonwebtoken'

const authUser=async (req,res,next)=>{
    try{
    const {token}=req.headers
    if(!token)
    {
        return res.status(404).json({
            success:false,
            message:"token not available"
        })
    }
const match= jwt.verify(token,process.env.JWT_SECRET)
if(!match)
{
    return res.status(404).json({
        success:false,
        message:"token mot matched"
    })
} 
req.body.userId=match.id;
next()

}

    catch(error)
    {
return res.status(500).json({
    success:false,
    message:error.message
})
    }
}

export default authUser