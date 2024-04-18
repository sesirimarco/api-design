import app from './server';
import * as dotenv from 'dotenv';
dotenv.config();
const PORT  = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log('localhost:3001');
});
