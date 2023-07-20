const express=require('express')
const cors=require('cors');
const authrequest=require('./router/auth.js')
const app=express();

const PORT=process.env.port || 5000;

require('dotenv').config();
const accountSid=process.env.Twilio_account_sid;
const authtoken=process.env.twilio_auth_token;
const messagingServiceSid=process.env.twilio_messagingservice;

const twilioclient=require("twilio")(accountSid,authtoken)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/auth',authrequest)
app.get('/',(req,res)=>{
    res.send('Hello world!');
})
app.post('/',(req,res)=>{
    const {message,user:sender,type,members}=req.body;
    if(type==='message.new'){
        members
        .filter((member)=>member.userId!==sender.id)
        .forEach(({user}) => {
            if(!user.online){
                twilioclient.messages.create({
                    body:`You have a new message from ${message.user.fullName} -${message.text}`,
                    messagingServiceSid:messagingServiceSid,
                    to:user.PhoneNumber
                })
                .then(()=>console.log("message send"))
                .catch((err)=>console.log(err))
            }
        });
        res.status(200).send('Message sent!')
    }
    return res.status(200).send('Not a new Message request')
})
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))