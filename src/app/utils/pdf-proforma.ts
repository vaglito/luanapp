"use client";
import { Products } from "@/app/types/products.type";
import { convertUsdToPen } from "@/app/lib/currency";
import { logoBase64 } from "./assets/logo-64";
import { logoBcp } from "./assets/bcp-logo-64";
import { logoBbva } from "./assets/bbva-logo";
import { logoInterbank } from "./assets/interbank-logo";
import { logoAmd } from "./assets/amd-logo";
import { logoIntel } from "./assets/intel-logo";
import { logoGigabyte } from "./assets/gigabyte-logo";
import { logoNvidea } from "./assets/nvidea-logo";

type generateProformaPDFProps = Products & { quantity: number };

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

  const docDefinition = {
    content: [
      {
        columns: [
          {
            image: "logo",
            width: 210,
          },
          {
            stack: [
              { text: "CORPORACION LUANA S.A.C", style: "title" },
              { text: "RUC: 20543896129", style: "info" },
              {
                text: [
                  "AV. GARCILASO DE LA VEGA Nº 1251\n",
                  "INT. 118 - 209\n",
                  "ventas01@corporacionluana.pe",
                ],
                style: "info",
              },
            ],
            alignment: "right",
          },
        ],
        margin: [0, 0, 0, 5],
      },
      {
        columns: [{ text: "PROFORMA DE VENTA", style: "header" }],
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
            ...cartItems.map((item) => {
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
                },
                {
                  text: item.relay.productName,
                  alignment: "justify",
                  margin: [0, 5, 0, 5],
                },
                {
                  text: `$${price.toFixed(2)}`,
                  alignment: "center",
                  margin: [0, 5, 0, 5],
                },
                {
                  text: `$${subtotal.toFixed(2)}`,
                  alignment: "center",
                  margin: [0, 5, 0, 5],
                },
              ];
            }),
          ],
        },
        layout: "headerLineOnly",
        margin: [0, 10, 0, 1],
      },
      {
        columns: [
          {
            ul: [
              "VALIDEZ DE OFERTA: 3 DIAS",
              "IMPUESTO: INCLUYE IGV",
              "TIEMPO DE ENTREGA: INMEDIATA",
              "PRECIOS SUJETOS A TIPO DE CAMBIO",
              "CONDICIÓN DE PAGO: CONTADO",
            ],
          },
          {
            text: "RECARGO DEL 5% POR PAGOS CON TARJETAS DEBITO / CREDITO",
            italics: true,
            color: "red",
            alignment: "right",
          },
        ],
        fontSize: 11,
        margin: [0, 5, 0, 1],
      },
      {
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
              { text: totalUSD.toFixed(2), alignment: "right", fontSize: 14 },
            ],
            [
              { text: "S/", alignment: "right", fontSize: 14 },
              { text: totalPEN.toFixed(2), alignment: "right", fontSize: 14 },
            ],
          ],
        },
        layout: "headerLineOnly",
        margin: [0, 5, 0, 1],
      },
      {
        table: {
          widths: ["auto", "*", "*"],
          body: [
            [
              { text: "BANCO", style: "tableHeader" },
              { text: "CUENTA S/", style: "tableHeader" },
              { text: "CUENTA $", style: "tableHeader" },
            ],
            [
              { image: logoBbva, width: 50, margin: [0, 3, 0, 3] },
              {
                text: "0011 01750100065080\nCCI 01117500010006508072",
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
              {
                text: "0011 0353010003853607",
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
            ],
            [
              { image: "logoBcp", width: 50, margin: [0, 3, 0, 3] },
              {
                text: "191 1941377 0 67\nCCI 00219100194137706758",
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
              {
                text: "191 1931817 1 11\nCCI 00219100193181711153",
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
            ],
            [
              { image: "logoInterbank", width: 70, margin: [0, 3, 0, 3] },
              {
                text: "CUENTA CORRIENTE\n488 300267117 1",
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
              "",
            ],
          ],
        },
        layout: "lightHorizontalLines",
      },
      {
        columns: [
          {
            text: "LAS COMPRAS ESTÁN SUJETAS A TÉRMINOS Y CONDICIONES\nhttps://corporacionluana.pe/terminos-de-garantia/",
          },
        ],
        fontSize: 11,
        margin: [0, 5, 0, 1],
      },
      {
        columns: [
          { width: "*", text: "" }, // espacio flexible a la izquierda
          {
            width: "auto",
            stack: [
              {
                columns: [
                  {
                    image: "logoAmd",
                    width: 70,
                    alignment: "center",
                    margin: [0, 3, 0, 3],
                  },
                  {
                    image: "logoIntel",
                    width: 70,
                    alignment: "center",
                    margin: [0, 3, 0, 3],
                  },
                  {
                    image: "logoGigabyte",
                    width: 70,
                    alignment: "center",
                    margin: [0, 3, 0, 3],
                  },
                  {
                    image: "logoNvidea",
                    width: 70,
                    alignment: "center",
                    margin: [0, 3, 0, 3],
                  },
                ],
                columnGap: 10,
              },
            ],
          },
          { width: "*", text: "" }, // espacio flexible a la derecha
        ],
        margin: [0, 5, 0, 1],
      },
    ],
    images: {
      logo: logoBase64,
      logoBcp: logoBcp,
      logoBbva: logoBbva,
      logoInterbank: logoInterbank,
      logoAmd: logoAmd,
      logoIntel: logoIntel,
      logoGigabyte: logoGigabyte,
      logoNvidea: logoNvidea,
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
      slogan: {
        fontSize: 10,
        italics: true,
        alignment: "center",
        margin: [0, 5, 0, 5],
        color: "#666666",
      },
      sectionHeader: {
        fontSize: 11,
        bold: true,
        margin: [0, 10, 0, 5],
        color: "#333333",
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
