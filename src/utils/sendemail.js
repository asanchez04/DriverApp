'use strict'

const nodemailer = require('nodemailer')

const emailClient = {
  GMAIL: {
    host: 'smtp.gmail.com',
    port: 465
  },
  HOTMAIL: {
    host: 'smtp-mail.outlook.com',
    port: 587
  }
}

const SendEmail = (fullname,email) => {
  
    let transporter = nodemailer.createTransport({
      host: emailClient.HOTMAIL.host,
      secureConnection: false,
      port: emailClient.HOTMAIL.port,
      tls: {
        ciphers: 'SSLv3'
      },
      auth: {
        user: 'tasknow17@hotmail.com',
        pass: 'tasknow2017'
      }
    })

    let mailOptions = {
      from: '"Welcome back, MotoApp" ',
      to: email,
      subject: 'Registro MotoApp! ',
      text: 'Registro MotoApp!',
      html: `
        <table cellpadding="0" cellspacing="0" align="center" style="padding:10px 20px; background:#ffffff; background-color:#ffffff; border:2px solid #0DAAED; border-radius: 10px;width:600px; height:450px">
        <tbody>
          <tr>
            <td style="font-weight:600; width:480px; height:100px; border-bottom:2px solid #0DAAED; text-align:center; font-family:'Trebuchet MS'; font-style:bold; color:#0DAAED; font-size:24px; padding:10px">
              Confirmación de registro </td>
            <td style="width:120px; height:100px; background-color:#0DAAED; text-align:center">
              <img data-imagetype="External" src="https://image.flaticon.com/icons/svg/1168/1168000.svg" alt="icono"
                width="60" height="70"> </td>
          </tr>
          <tr>
            <td colspan="2" valign="top" align="justify" style="width:600px; height:250px; font-family:'Trebuchet MS'; color:#000; font-size:15px; line-height:26px; text-align:left; padding-top:10px; padding-left:40px; padding-right:40px; text-align:justify">
              <p>Estimado(a) <span style="font-family: &quot;Trebuchet MS&quot;, serif, EmojiFont; color: rgb(0, 0, 0); font-size: 15px; font-weight: 800;">${fullname}</span>, </p>
              <p> Gracias por hacer parte de MotoApp, para finalizar el proceso de registro por favor confirma tu cuenta accediendo a la siguiente opción: </p>
              <table align="center" style="border-radius:5px; background-color:#0DAAED; font-family:'Trebuchet MS'; color:#ffffff; text-decoration:none; font-size:23px; font-weight:bold; width:480px; height:50px; padding-top:8px; padding-bottom:8px; text-align:center">
                <tbody>
                  <tr>
                    <td><a href="#"
                        target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" style="font-family:Roboto; color:#ffffff; text-decoration:none; font-size:24px; font-weight:bold; padding:10px; padding-left:30px; padding-right:30px">Confirmar cuenta</a> </td>
                  </tr>
                </tbody>
              </table>
              <p>Si tiene alguna inquietud o duda acerca del proceso de confirmación de cuenta no dude en escribirnos a <i>atencionusuario@motoapp.com</i> y resolveremos su caso. </p>
            </td>
          </tr>
        </tbody>
    </table>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error){
        console.log(error)
      }  else{
        console.log(`[MESSAGE SENT] [${email}]`)
      }    
    })
  }

module.exports = SendEmail
