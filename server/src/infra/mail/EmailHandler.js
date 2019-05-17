const Email = require("email-templates");
const nodemailer = require("nodemailer");
const path = require("path");

class EmailHandler {
  constructor({ config }) {
    this.config = config;
  }

  async sendEmail(user, order) {
    const transport = nodemailer.createTransport(this.config.smtp);
    const email = new Email({
      message: {
        from: "accounts@ipragmatech.com",
      },
      transport: transport
    });
    email
      .send({
        template: path.join(__dirname, "placeOrder"),
        message: {
          to: user.email
        },
        locals: {
          name: user.name,
          orderId: order
        }
      });
  }
}

module.exports = EmailHandler;
