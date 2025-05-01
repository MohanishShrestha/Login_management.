import nodemailer from "nodemailer";
// the main thing in this file is trasporterInfo and mailInfo
//neglet other part

//transporterInof gives form information while mailInof gives to info
let transporterInfo = {
  // host: emailHost,
  host: "smtp.gmail.com",
  // if from is gmail use gmail smtp
  port: 587,
  secure: false,

  //   auth user and pass play the role from
  auth: {
    // note user and pass most be genuine
    //it is the email through which email is send
    user: "shresthamohanish123@gmail.com",
    pass: "eihs eezn wybs jkkp",
    // to send email form server first you have to =>
    //use 2-step verification and generate app password
    //instead of using your password use app password of gmail
    //for this go to the => manage your account => security setting and=>enable 2-step verifiction =>(search app password) create app pssword (select other option)
  },
};

export let sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo); //transporter gives from information
    let info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("error has occurred", error.message);
  }
};

// How to call mail
// await sendEmail({
// from: 'Unique <uniquekc425@gmail.com>',
//   to: ["abc@gmail.com", "nitanthapa425@gmail.com"],
//   subject: "My first system email",
//   html: `<h1>Hello world</h1>`,
// });

// the from part is responsible  to show
