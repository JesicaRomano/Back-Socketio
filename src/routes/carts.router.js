import { Router } from "express";
import CartManager from "../controllers/CartManager.js"

const CartRouter = Router();
const carts = new CartManager

//Para agregar carritos
CartRouter.post("/", async (req, res) => {
    res.send(await carts.addCarts())
})

//Para listar todos los carritos
CartRouter.get('/', async (req, res) => {
    res.send(await carts.readCarts())
})

//Para buscar el carrito por ID
CartRouter.get('/:id', async (req, res) => {
    res.send(await carts.getCartsById(req.params.id))
})

//Para agregar el producto dentro del carrito
CartRouter.post('/:cid/products/:pid', async(req,res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    res.send(await carts.addProductInCart(cartId, productId))
})

export default CartRouter