import { promises as fs } from 'fs';
import { nanoid } from "nanoid";
import ProductManager from './ProductManager.js';

const productAll = new ProductManager

class CartManager{
    constructor() {
        this.path = "./src/models/carts.json";
    }

    async readCarts (){
        try{
            let carts = await fs.readFile(this.path, "utf-8");
            return JSON.parse(carts)
        }
        catch(error){
            throw new Error('Error al leer el carrito')
        }
    }
    
    
    async writeCarts (carts) {
        try{
            await fs.writeFile(this.path, JSON.stringify(carts))  
        }
        catch(error){
            throw new Error('Error al escribir el carrito')
        }
    }
    
    async exist(id){
        try{
            let carts = await this.readCarts();
            return carts.find(cart => cart.id === id)
        }
        catch(error){
            throw new Error('Error al verificar existencia del carrito')
        }
    }

    async addCarts () {
        try{
            let cartsOld = await this.readCarts();
            let id = nanoid()
            let cartsConcat = [{ id:id, products : []}, ...cartsOld]
            await this.writeCarts(cartsConcat)
            return "Carrito agregado"
        }
        catch(error){
            throw new Error('Error al agregar al carrito')
        }
    };

    getCartsById = async (id) => {
        let cartById = await this.exist(id)
        if(!cartById) return "Carrito no encontrado"
        return cartById
    };

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if(!cartById) return "Carrito no encontrado"
        let productById = await productAll.exist(productId)
        if(!productById) return "Producto no encontrado"

        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(cart => cart.id != cartId)

        if(cartById.products.some(prod => prod.id === productId)){
            let moreProductInCart = cartById.products.find(prod => prod.id === productId)
            moreProductInCart.cantidad++
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto Sumado al Carrito"
        }

        cartById.products.push({ id: productById.id, cantidad: 1})
        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto Agregado al Carrito"
    }
}

export default CartManager