module.exports = {
  development: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "accounts@makeurownrules.com",
      pass: ""
    }
  },
  test: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "accounts@makeurownrules.com",
      pass: ""
    }
  },
  production: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.IS_SECURE, // use SSL
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD
    }
  }
};
