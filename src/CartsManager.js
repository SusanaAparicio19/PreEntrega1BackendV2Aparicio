import { response } from 'express';
import { promises as fs } from 'fs';

export class CartsManager {
    static #lastId = 0;

    constructor() {
    this.path = 'carts.json'
    this.carts = [];
  }

  getCarts = async () => {
    const data = await fs.readFileSync(this.path, 'utf8')
    const dataJSON = JSON.parse(data)
    return dataJSON
  }

  getCartsProducts = async (id) =>{
    const carts = await this.getCarts()

    const cart = cart.find(cart => cart.id === id)

    if (cart){
      return cart.products
    }else {
      console.log('No se encontro el carrito');
    }
  }

  static #generarNewCartId() {
    return ++CartsManager.#lastId;
  }

  async createCart() {
    const idCart = CartsManager.#generarNewCartId()
    const newCart = {idCart, products: []}
    
    this.carts = await this.getCarts()

    this.carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(this.carts))
    
    return newCart;
  }

  addProductToCart = async (cartId, productId) => {
    const carts = await this.getCarts()
    const index = carts.findIndex(cart=> cart.id === cartId)

    if (index != -1){
      const cartProducts = await this.getCartsProducts(cartId)
      const existingProductIndex = cartProducts.findIndex(product => product.productId === productId)
      
      if(existingProductIndex != -1) {
        cartProducts[existingProductIndex].quantity = cartProducts[existingProductIndex].quantity + 1
      } else{
        cartProducts.push({ productId, quantity : 1});
      }

      carts[index].products = cartProducts

      await fs.writeFile(this.path, JSON.stringify(carts))
      console.log('Se agrego el Producto!!');
    } else{
      console.log('Carrito no encontrado')
    }
  }
}


