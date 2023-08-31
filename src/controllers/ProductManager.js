import { promises as fs } from 'fs';
import { nanoid } from "nanoid";

class ProductManager {

    constructor() {
        this.path = "./src/models/products.json";
        
    }

    async readProducts () {
        try{
            let products = await fs.readFile(this.path, "utf-8");
            return JSON.parse(products)
        }
        catch(error){
            throw new Error('Error al leer los productos')
        }
    }

    async exist (id) {
        try{
            let products = await this.readProducts();
            return products.find(prod => prod.id === id)
        }
        catch(error){
            throw new Error('Error al buscar si existe por id')
        }
    }

    async writeProducts (product) {
        try{
            await fs.writeFile(this.path, JSON.stringify(product))
        }
        catch(error){
            throw new Error('Error al escribir los productos')
        }
    }

    async addProducts(product) {
        try{
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll =[...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto Agregado"
        }
        catch(error){
            throw new Error('Error al agregar productos')
        }
    }    

    async getProducts(){
        try{
            return await this.readProducts()
        }
        catch(error){
            throw new Error('Error al retornar productos')
        }
    }

    getProductsById = async (id) => {
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"
        return productById
    };


    updateProducts = async(id, product) => {
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products)
        return "Producto Actualizado"
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id === id)
        if(existProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto Eliminado"
        }
        return "Producto a eliminar no existe";
    }
}

export default ProductManager