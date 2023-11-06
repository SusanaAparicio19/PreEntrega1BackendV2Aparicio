import { Router } from "express";
import {cartsManager} from '../App.js';

const cartsRouter = Router();





cartsRouter.post('/', async (req, res) => {
  try{
    const response = await cartsManager.newCart()
    res.json(response)
  }catch(error){
    res.send('Error al crear el carrito')
  }
})

cartsRouter.get('/:cid', async (req, res) => {
  const {cid} = req.params;
  try{
    const response = await cartsManager.getCartsProduct(cid)
    res.json(response)
  }catch(error){
    res.send('Error al enviar los productos al carrito')
  }
})
  
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const {cid, pid} = req.params;
  try{
    await cartsManager.addProductToCart(cid, pid)
    res.send('Se agrego exitosamente el producto!!')
  }catch(error){
    res.send('Error al guardar el producto al carrito')
  }
})
  
export {cartsRouter}


