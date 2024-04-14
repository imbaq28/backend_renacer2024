import express from "express";

const api = express.Router();

api.get('/rol', function(req, res){
  console.log('here')
  res.status(200).send('test rol')
})

export default api