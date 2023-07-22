const bcrypt=require('bcryptjs')
const {connect}=require('getstream');
const {StreamChat} =require('stream-chat');
const crypto=require('crypto');

require('dotenv').config();
const api_key=process.env.STREAM_API_KEY;
const api_id=process.env.STREAM_APP_ID;
const api_secret=process.env.STREAM_API_SECRET;

const signup=async (req,res)=>{
try {
    const {fullName,Username,PhoneNumber,AvatarURL,Password,ConfirmPassword}=req.body;
    const client=StreamChat.getInstance(api_key,api_secret);
    const {users}=await client.queryUsers({name:Username})
    if(users.length){
        return res.status(200).json({message:"U3"});
        
            }
  const userId=  crypto.randomBytes(16).toString('hex');
  const serverClient=connect(api_key,api_secret,api_id)
const haseshpass=await bcrypt.hash(Password,10);
const token=serverClient.createUserToken(userId)
res.status(200).json({fullName,userId,Username,PhoneNumber,haseshpass,token})
} catch (error) {
    console.log(error)
    res.status(500).json({message:error})
}

}
const login=async (req,res)=>{

    try {
    const {Username,Password}=req.body;
    const serverClient=connect(api_key,api_secret,api_id)
    const client=StreamChat.getInstance(api_key,api_secret);
    const {users}=await client.queryUsers({name:Username})
    console.log("users"+users)
    if(!users.length){
return res.status(200).json({message:"U1"});

    }
    const success=await bcrypt.compare(Password,users[0].haseshpass);
    const token=serverClient.createUserToken(users[0].id)
if(success){
    res.status(200).json({token,fullName:users[0].fullName,Username:users[0].Username,userId:users[0].id})
}
else{
  return  res.status(200).json({message:"p2"})
}
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
    
}

module.exports={signup,login};