import express from 'express';
import { ProductManager } from './ProductManager.js';
import { CartsManager } from './CartsManager.js';
import { PORT, PRODUCTS_JASON, CARTS_JASON } from './config.js';
import { productsRouter } from './routes/productsRouter.js';
import { cartsRouter } from './routes/cartsRouter.js'


export const ProdMan = new ProductManager({ path: './db/products.json' });
export const cartsManager = new CartsManager;
const app = express();


app.use(express.json());
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use(express.urlencoded({ extended: true }));

  
app.get('/', (request, response) => {
    response.sendFile('index.html', {root: 'views'})
})

app.listen(PORT, async () => {
  console.log(`Conectado al puerto ${PORT}`);
});