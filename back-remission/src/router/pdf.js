const express = require("express");

// read file
const fs = require("fs");
const hbs = require("hbs");
const readFile = require("util").promisify(fs.readFile);
const htmlPDF = require("puppeteer-html-pdf");

// database
const db = require("../connect/connection");
// utils
const utils = require("../utils/utils");
// pdf router const
const pdfRouter = express.Router();

pdfRouter.get("/remission/:id", async (req, res) => {
  try {
    const { id } = req.params; // this id is of remission
    const pdfData = getInfoRemissionPDF(id, req);
    const options = {
      format: "A4",
    };

    // using template
    const html = await readFile("src/views/remission.hbs", "utf8");
    const template = hbs.compile(html);
    const content = template(pdfData);
    const buffer = await htmlPDF.create(content, options);

    // res attachment
    res.attachment(`remission_${id}.pdf`);
    res.end(buffer);
  } catch (e) {
    console.log(e);
  }
});

// utils
const getInfoRemissionPDF = async (id, req) => {
  const pdfData = {
    invoiceItems: [
      { item: "Website Design", amount: 5000 },
      { item: "Hosting (3 months)", amount: 2000 },
      { item: "Domain (1 year)", amount: 1000 },
    ],
    invoiceData: {
      invoice_id: 123,
      transaction_id: 1234567,
      payment_method: "Paypal",
      creation_date: "04-05-1993",
      total_amount: 141.5,
    },
    baseUrl: `${req.protocol}://${req.get("host")}`, // http://localhost:3001 or the server host
  };
  return pdfData;
};
module.exports = pdfRouter;
