import React from 'react';
import QRCode from 'react-qr-code';

type QRCodeDisplayProps = {
  url: string;
};

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url }) => {
  return <QRCode value={url} />;
};

export default QRCodeDisplay;