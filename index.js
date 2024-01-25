import config from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Router from './src/routes/routes';

config.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT || 8080;

app.use('/api/v1', Router);
// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}));
app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});
export default app;