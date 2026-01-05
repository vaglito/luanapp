"use client";

import { Proforma } from "../types/proformas.type";
import { header } from "./assets/header";
import { cuenta } from "./assets/cuentas";
import { convertUsdToPen } from "@/app/lib/currency";

function getCuentasTable() {
  return {
    image: "cuenta",
    width: 450,
    margin: [0, 10, 0, 0],
    alignment: "center",
  };
}

export async function generateProformaPDF({
  proforma,
  exchange,
}: {
  proforma: Proforma;
  exchange: number;
}) {
  if (typeof window === "undefined") return;

  const pdfMakeModule = await import("pdfmake/build/pdfmake");
  const pdfFontsModule = await import("pdfmake/build/vfs_fonts");
  pdfMakeModule.default.vfs = pdfFontsModule.default.vfs;

  const totalpen = parseFloat(proforma.total);
  const subtotalpen = parseFloat(proforma.subtotal);

  const totalPEN = convertUsdToPen(totalpen, exchange);
  const subtotalPEN = convertUsdToPen(subtotalpen, exchange);


  const today = new Date(proforma.createdAt).toLocaleDateString("es-PE");

  const content: any[] = [
    {
      text: `PROFORMA DE VENTA ${proforma.code}`,
      style: "header",
      margin: [0, 100, 0, 10],
    },
    {
      columns: [
        [
          { text: `Cliente: ${proforma.customer}`, style: "info" },
          {
            text: `Documento: ${proforma.customerDocument}`,
            style: "info",
          },
          {
            text: `Modo de pago: ${proforma.mode}`,
            style: "info",
          },
        ],
        [
          {
            text: `Fecha: ${today}`,
            alignment: "right",
            style: "info",
          },
          {
            text: `Tipo de cambio: ${exchange.toFixed(2)}`,
            alignment: "right",
            style: "info",
          },
        ],
      ],
      margin: [0, 0, 0, 15],
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
          ...proforma.items.map((item) => [
            {
              text: item.quantity,
              alignment: "center",
              fontSize: 11,
            },
            {
              text: item.productName,
              alignment: "justify",
              fontSize: 11,
            },
            {
              text: `S/.${convertUsdToPen(Number(item.unitPrice), exchange).toFixed(2)}`,
              alignment: "center",
              fontSize: 11,
            },
            {
              text: `S/.${convertUsdToPen(Number(item.total), exchange).toFixed(2)}`,
              alignment: "center",
              fontSize: 11,
            },
          ]),
        ],
      },
      layout: "headerLineOnly",
      margin: [0, 0, 0, 15],
    },
    {
      columns: [
        {
          ul: [
            "VALIDEZ DE OFERTA: 3 DÍAS",
            "IMPUESTO: INCLUYE IGV",
            "DOCUMENTO NO TRIBUTARIO",
          ],
          fontSize: 10,
        },
        {
          width: "auto",
          table: {
            widths: ["*", "auto"],
            body: [
              [
                {
                  text: "TOTAL",
                  colSpan: 2,
                  alignment: "right",
                  bold: true,
                  fontSize: 14,
                  decoration: "underline",
                },
                "",
              ],
              [
                { text: "S/", alignment: "right", fontSize: 13 },
                {
                  text: totalPEN.toFixed(2),
                  alignment: "right",
                  fontSize: 13,
                },
              ],
            ],
          },
          layout: "headerLineOnly",
        },
      ],
    },
    getCuentasTable(),
  ];

  const docDefinition = {
    header: {
      image: "header",
      fit: [540, 500],
      alignment: "center",
      margin: [0, 5, 0, 5],
    },
    content,
    images: {
      header,
      cuenta,
    },
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        alignment: "center",
      },
      info: {
        fontSize: 11,
        lineHeight: 1.3,
      },
      tableHeader: {
        fillColor: "#5914A3",
        color: "white",
        bold: true,
        alignment: "center",
        fontSize: 11,
      },
    },
    defaultStyle: {
      fontSize: 10,
    },
  };

  pdfMakeModule.default.createPdf(docDefinition).open();
}
