import express from 'express';

import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import searchRoutes from './routes/searchRoutes';
import spamRoutes from './routes/spamRoutes';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/spam', spamRoutes)

app.get('/', (req, res) => {
  res.send('Hello World');
});


export default app;