const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const ProductModal = require("../models/productModel");
const cron = require("node-cron");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: "zerowasteprojectpi@gmail.com",
      pass: "dpftjggixoioegnv",
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
);

async function sendEmailProduct(to) {
  try {
    const today = new Date();
    today.setDate(today.getDate() + 5);
    const expiredProducts = await ProductModal.find({
      expiry_date: {
        $lte: today,
        $gt: new Date(),
      },
    });
    if (expiredProducts.length !== 0) {
      const response = await transporter.sendMail({
        from: "zerowasteprojectpi@gmail.com", // sender address
        to: to, // list of receivers
        subject: `URGENT`, // Subject line
        html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to zeroWaste.</h2>
                          <p>Some products have reached their expriry date. Please check your Product list!
                          </p>
                          </div>
                      `,
      });
    }
  } catch (error) {
    return false;
  }
  return true;
}

module.exports = sendEmailProduct;
