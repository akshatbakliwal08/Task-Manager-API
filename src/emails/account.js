const sgMail=require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail=(email, name)=>{
    sgMail.send({
        to:email,
        from:'akshatbakliwal08@gmail.com',
        subject:'Welcome',
        text: 'Welcome to the app, '+name+'. Let me know how you get along'
    });
}
const sendCancelEmail=(email, name)=>{
    sgMail.send({
        to:email,
        from:'akshatbakliwal08@gmail.com',
        subject:'Account Deletion',
        text:'Goodbye, '+name+'. We hope you had a good time with us.'
    });
}

module.exports={
    sendWelcomeEmail,
    sendCancelEmail
}