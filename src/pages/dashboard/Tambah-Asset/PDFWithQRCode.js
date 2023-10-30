import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import QRCode from 'qrcode.react';

const PDFWithQRCode = ({ qrCodeData }) => {
  return (
    <Document>
      <Page size="A4">
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <Text>Your PDF Content Goes Here</Text>
          </View>
          <View style={{ width: '50%' }}>
            <QRCode value={qrCodeData} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFWithQRCode;
