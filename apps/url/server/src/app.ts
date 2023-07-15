import express from 'express';
import cors from 'cors';

/**
 * * Stateful dependencies to inject at root.
 */
type MainDependencies = {
  shortenUrl: (original: string) => Promise<string>;
  lookupUrl: (shortId: number) => Promise<string>;
};

export async function createApp({ shortenUrl, lookupUrl }: MainDependencies) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.post('/api/shorten', async (req, res) => {
    const original = req.body.original;
    const short = await shortenUrl(original);

    res.status(201).send({
      short: short,
      original: original,
    });
  });

  app.get('/s/:id', async (req, res) => {
    try {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    
      console.log('Full URL:', fullUrl);
      const id = Number(req.params.id);
      const original = await lookupUrl(id);
      //res.redirect(original);
      res.redirect(original.startsWith('http') ? original : `http://${original}`);

    } catch (error) {
      res.status(404).send('URL not found');
    }
  });

  // app.get('/s/:id', async (req, res) => {
  //   const id = Number(req.params.id);
  //   const original = await lookupUrl(id);
  //   res.redirect(original);
  // });

  return app;
}