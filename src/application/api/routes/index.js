import express from "express";
import fs from 'fs';
import path from "path";
import { fileURLToPath, pathToFileURL } from 'url'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const archivos = {};

const files = fs.readdirSync(__dirname);
  files.forEach(async function (file) {
    const pathFile = path.join(__dirname, file);
    if (fs.statSync(pathFile).isDirectory()) {
      const folderName = file; // Nombre de la carpeta
    
      const folderFiles = fs.readdirSync(pathFile);
      
      for (const folderFile of folderFiles) {
        const filePath = path.join(pathFile, folderFile);
        const routeName = `${folderName}/`; // Nombre de la carpeta seguido del nombre del archivo
        
        // console.log('Ruta:', routeName);
        // console.log('Ruta absoluta:', filePath);

        const fileURL = pathToFileURL(filePath).toString();
        const modulo = await import(fileURL);
        archivos[routeName] = modulo.default;
        
        router.use(`/${routeName}`, archivos[routeName]);

      };

    }
  });

export default router;
