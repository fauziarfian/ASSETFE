import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const QRCodeDocument = ({ qrCodeValue }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      padding: 10,
    },
    qrCodeContainer: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginBottom: 10,
    },
    qrCode: {
      width: '100%',
      height: '100%',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.qrCodeContainer}>
          <Image src={`data:image/png;base64, ${generateQRCodeBase64(qrCodeValue)}`} style={styles.qrCode} />
        </View>
        <Text>Cetak QR Code</Text>
      </Page>
    </Document>
  );
};

export default QRCodeDocument;
