"use client";
import { Products } from "@/types/products.type";
import { convertUsdToPen } from "@/lib/currency";
import { header } from "./assets/header";
import { cuenta } from "./assets/cuentas";

type generateProformaPDFProps = Products & { quantity: number };

function getCuentasTable() {
  return {
    image: "cuenta",
    width: 450,
    margin: [0, 1, 0, 1],
    alignment: "center",
  };
}

export async function generateProformaPDF(
  cartItems: generateProformaPDFProps[],
  exchangeRate: number
) {
  if (typeof window === "undefined") return;

  const pdfMakeModule = await import("pdfmake/build/pdfmake");
  const pdfFontsModule = await import("pdfmake/build/vfs_fonts");
  pdfMakeModule.default.vfs = pdfFontsModule.default.vfs;

  const totalUSD = cartItems.reduce((sum, item) => {
    const price =
      item.relay.priceBulk > 0 ? item.relay.priceBulk : item.relay.priceSale;
    return sum + price * item.quantity;
  }, 0);
  const totalPEN = convertUsdToPen(totalUSD, exchangeRate);
  const today = new Date().toLocaleDateString("es-PE");

  const chunkedItems = [];
  for (let i = 0; i < cartItems.length; i += 6) {
    chunkedItems.push(cartItems.slice(i, i + 6));
  }

  const content: any[] = [];

  chunkedItems.forEach((group, index) => {
    if (index > 0) content.push({ text: "", pageBreak: "before" });

    content.push(
      {
        columns: [
          {
            text: "PROFORMA DE VENTA",
            style: "header",
            margin: [0, 100, 0, 1],
          },
        ],
      },
      {
        columns: [
          { text: `TIPO DE CAMBIO: ${exchangeRate.toFixed(2)}` },
          { text: `Lima, ${today}`, alignment: "right" },
        ],
        margin: [0, 1, 0, 1],
      },
      {
        table: {
          widths: ["auto", "*", "auto", "auto"],
          body: [
            [
              { text: "CANT.", style: "tableHeader" },
              { text: "PRODUCTO", style: "tableHeader" },
              { text: "P. U", style: "tableHeader" },
              { text: "TOTAL", style: "tableHeader" },
            ],
            ...group.map((item) => {
              const price =
                item.relay.priceBulk > 0
                  ? item.relay.priceBulk
                  : item.relay.priceSale;
              const subtotal = price * item.quantity;
              return [
                {
                  text: item.quantity.toString(),
                  alignment: "center",
                  margin: [0, 5, 0, 5],
                  fontSize: 11,
                },
                {
                  text: item.relay.productName,
                  alignment: "justify",
                  margin: [0, 5, 0, 5],
                  fontSize: 11,
                },
                {
                  text: `$${price.toFixed(2)}`,
                  alignment: "center",
                  margin: [0, 5, 0, 5],
                  fontSize: 11,
                },
                {
                  text: `$${subtotal.toFixed(2)}`,
                  alignment: "center",
                  margin: [0, 5, 0, 5],
                  fontSize: 11,
                },
              ];
            }),
          ],
        },
        layout: "headerLineOnly",
        margin: [0, 5, 0, 1],
      },
      {
        columns: [
          {
            ul: [
              "VALIDEZ DE OFERTA: 3 DIAS",
              "IMPUESTO: INCLUYE IGV",
              "PRECIOS SUJETOS A TIPO DE CAMBIO",
            ],
          },
          {
            text: "RECARGO DEL 5% POR PAGOS CON TARJETAS DEBITO / CREDITO",
            italics: true,
            color: "red",
            alignment: "right",
          },
        ],
        fontSize: 10,
        margin: [0, 1, 0, 1],
      },
      {
        columns: [
          {
            width: "*",
            text: "LAS COMPRAS ESTÁN SUJETAS A TÉRMINOS Y CONDICIONES\nhttps://corporacionluana.pe/terminos-de-garantia/",
            fontSize: 11,
            margin: [0, 5, 10, 1],
          },
          {
            width: "auto",
            table: {
              widths: ["*", "auto"],
              body: [
                [
                  {
                    text: "Total Doc.",
                    colSpan: 2,
                    alignment: "right",
                    fontSize: 15,
                    bold: true,
                    decoration: "underline",
                  },
                  "",
                ],
                [
                  { text: "$", alignment: "right", fontSize: 14 },
                  {
                    text: totalUSD.toFixed(2),
                    alignment: "right",
                    fontSize: 14,
                  },
                ],
                [
                  { text: "S/", alignment: "right", fontSize: 14 },
                  {
                    text: totalPEN.toFixed(2),
                    alignment: "right",
                    fontSize: 14,
                  },
                ],
              ],
            },
            layout: "headerLineOnly",
            margin: [0, 1, 0, 1],
          },
        ],
      },
      getCuentasTable()
    );
  });

  const docDefinition = {
    header: {
      image: "header",
      fit: [540, 500],
      margin: [0, 5, 0, 5],
      alignment: "center",
    },
    content,
    images: {
      header: header,
      cuenta: cuenta,
    },
    styles: {
      title: {
        fontSize: 15,
        bold: true,
        color: "#333333",
      },
      info: {
        fontSize: 11,
        color: "#333333",
        lineHeight: 1.2,
      },
      header: {
        fontSize: 16,
        bold: true,
        color: "#333333",
        alignment: "center",
      },
      tableHeader: {
        fillColor: "#5914A3",
        color: "white",
        bold: true,
        fontSize: 11,
        alignment: "center",
        margin: [5, 2, 5, 2],
      },
    },
  };

  pdfMakeModule.default.createPdf(docDefinition).open();
}
``;

