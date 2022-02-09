const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  try {
    const { email, activity, message } = req.body;
    console.log(email);
    console.log(activity);
    console.log(message);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'relieve.escuela@gmail.com',
        pass: '',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    const html = `<p>${message}</p>`;

    await transporter.sendMail({
      from: 'relieve.escuela@gmail.com',
      to: email,
      subject: activity,
      html,
    });
    res.status(200).send('el email se envió');
  } catch (e) {
    return res.json({ error: e });
  }
};
module.exports = {
  sendEmail,
};
