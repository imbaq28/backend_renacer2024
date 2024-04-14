import express from "express";

const api = express.Router();

api.get('/permiso', function(req, res){
  console.log('here')
  res.status(200).send('test permiso')
})

export default api