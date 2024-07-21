import nodemailer from 'nodemailer';

const sendMail = (email, token, route) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    const url = `http://localhost:5173/${route}/${token}`;
    const mailOption = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: `${route} email`,
        text: `click this link for ${route} : ${url}`
    }

    transporter.sendMail( mailOption, function(error, info) {
            if (error) {
                console.log(error);
            }
            else {
                // if(!res.headersSent){
                //         res.json({ Status: "Success", token: token, message: info });
                // }
                // console.log(info);
                console.log('mail send..................');
            }
        }
    )
}

export { sendMail }
