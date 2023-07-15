import { Button, Input } from '@chakra-ui/react';
import { FormEvent, useCallback, useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';

import './styles/QRCodeDisplay.css';

type ShortenUrlFormProps = {
  requestShortUrl: (original: string) => Promise<void>;
};

export const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({
  requestShortUrl,
}) => {
  const [inputUrl, setInputUrl] = useState<string>('');
  const [qrCodeUrl, setQRCodeUrl] = useState<string>('');


  const isUrlValid = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      // Basic input filtering

      let trimmed = inputUrl.trim()
      
      if (trimmed === '') {
        return;
      }

      if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
        // Add the "http://" prefix to the URL if it is missing
        trimmed = `http://${trimmed}`;
      }
      
      if(!isUrlValid(trimmed)) {
        return;
      }

      await requestShortUrl(trimmed);
      setInputUrl('');

      setQRCodeUrl(trimmed);

    },
    [inputUrl, setInputUrl, requestShortUrl]
  );
  return (
    <form onSubmit={onSubmit}>
      <Input
        id="url-input"
        size="lg"
        marginBlock={4}
        value={inputUrl}
        onChange={(e) => {
          setInputUrl(e.target.value);
        }}
        placeholder="www.my-super-long-url-here.com/12345"
      />
      <Button id="submit-btn" type="submit" colorScheme="teal" size="lg">
        Generate
      </Button>
      <div className="qrcodeImage-container">
        {qrCodeUrl && <QRCodeDisplay url={qrCodeUrl} />}
      </div>
      
    </form>
  );
};

export default ShortenUrlForm;