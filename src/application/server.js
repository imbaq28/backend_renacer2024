import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './api/routes/index.js'
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3001

app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(fileUpload());

app.use('/api', routes)

app.use(express.static("public"));

app.listen(PORT, ()=>{
  console.log(`Iniciando en el puerto ${PORT}`);
})
