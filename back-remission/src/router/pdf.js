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
    const pdfData = await getInfoRemissionPDF(id, req);
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
  const querySelectRemission = `SELECT * FROM remission WHERE id=${id}`;
  const dataRemission = await db.handleQuery(querySelectRemission);

  if (Array.isArray(dataRemission) && dataRemission?.length > 0) {
    const querySelectUser = `SELECT * FROM user WHERE identy="${dataRemission[0]["identy_user"]}"`;
    const dataUser = await db.handleQuery(querySelectUser);
    if (Array.isArray(dataUser) && dataUser?.length > 0) {
      const codesProducts = dataRemission[0]["code_product"]?.split(",");
      const dataProducts = [];
      let total = 0;
      const statusRemisson = ["completado", "pendiente", "cancelado"];
      const paymentMethod = [
        "efectivo (pago directo)",
        "Bancolombia (pago directo)",
        "Nequi (pago directo)",
        "Daviplata (pago directo)",
        "tarjeta",
      ];
      for (let product of codesProducts) {
        if (product) {
          const querySelectProduct = `SELECT * FROM product WHERE code = ${product}`;
          const result = await db.handleQuery(querySelectProduct);
          dataProducts.push(result[0]);
          if (Array.isArray(result) && result.length > 0) {
            total += parseFloat(result[0]?.price);
          }
        }
      }
      if (dataProducts.length > 0) {
        // convert format cop
        for (let product of dataProducts) {
          product["price"] = parseInt(product["price"]).toLocaleString(
            "es-CO",
            { style: "currency", currency: "COP" }
          );
        }
      }

      const pdfData = {
        dataUser: dataUser[0],
        dataRemission: dataRemission[0],
        dataProducts,
        baseUrl: `${req.protocol}://${req.get("host")}`, // http://localhost:3001 or the server host
      };
      pdfData["dataRemission"]["day"] = new Date(
        dataRemission[0].created_at
      ).getDate();
      pdfData["dataRemission"]["month"] =
        new Date(dataRemission[0].created_at).getMonth() + 1;
      pdfData["dataRemission"]["year"] = new Date(
        dataRemission[0].created_at
      ).getFullYear();
      pdfData["dataRemission"]["payment_method"] = dataRemission[0]
        ?.payment_method
        ? paymentMethod[parseInt(dataRemission[0]?.payment_method) - 1]
        : "Aún no definido";
      pdfData["dataRemission"]["status_remission"] =
        statusRemisson[parseInt(dataRemission[0]?.status) - 1];
      pdfData["dataRemission"]["total_amount"] = total.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      });

      return pdfData;
    }
  }
};
module.exports = pdfRouter;
