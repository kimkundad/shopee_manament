import React, { useState, useEffect } from "react";
import { Flex, Text, Image, Box, Button } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import THSarabunNew from "@/components/THSarabunNew";
import DBadmanX from "@/components/DBadmanX";
export default function printReport() {
  const doc = new jsPDF();

  const printPDF = () => {
    doc.addFileToVFS("DBadmanX.ttf", DBadmanX);
    doc.addFont("DBadmanX.ttf", "DBadmanX", "bold");
    doc.setFont("DBadmanX", "bold");
    // Add recipient's name, address and phone number
    doc.setFontSize(44);
    doc.setTextColor(255, 0, 0);
    const textWidth1 =
      (doc.getStringUnitWidth("รายงาน") * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const x1 = (doc.internal.pageSize.width - textWidth1) / 2;
    doc.text("รายงาน", x1, 20);
    doc.addFileToVFS("DBadmanX.ttf", DBadmanX);
    doc.addFont("DBadmanX.ttf", "DBadmanX", "normal");
    doc.setFont("DBadmanX");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    const textWidth2 =
      (doc.getStringUnitWidth("รายงาน") * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const x2 = (doc.internal.pageSize.width - textWidth2) / 2;
    doc.text("รายงาน", x2, 30);

    const textWidth3 =
      (doc.getStringUnitWidth("รายงาน") * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const x3 = (doc.internal.pageSize.width - textWidth3) / 2;
    doc.text("รายงาน", x3, 40);

    const header = ["Order ID", "Product Name", "Num", "Price"];
    const columnWidths = [40, 70, 30, 30];
    const headerHeight = 10;
    const cellHeight = 10;

    // Draw the table header
    let x = 10;
    for (let i = 0; i < header.length; i++) {
      doc.setFillColor(220, 220, 220);
      doc.rect(x, 40, columnWidths[i], headerHeight, "F"); // Draw a filled rectangle for each header cell
      doc.rect(x, 40, columnWidths[i], headerHeight); // Draw the cell border
      doc.text(header[i], x + 2, 48); // The y value is 40 (top of the cell) + half the cell height
      x += columnWidths[i];
    }
    const pdfBlob = doc.output("blob");

    // Create a blob URL
    const url = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(url, "_blank");
    const link = document.createElement("a");
    link.href = url;
    link.download = `a.pdf`;
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Button onClick={printPDF}>aaaaaaaaaaaaaa</Button>
    </Box>
  );
}
