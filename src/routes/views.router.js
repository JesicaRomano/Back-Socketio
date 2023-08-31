import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";


const product = new ProductManager();


const viewsRouter= Router()


viewsRouter.get("/", async(req,res)=>{
    try{
        const productos = await product.getProducts()
        res.render('home', {title: "productos disponibles", productos})
    }
    catch(error){
        res.status(404).send(error)
    }
})

viewsRouter.get("/realtimeproducts",  async (req,res)=>{
    try{
        res.render('realTimeProducts', {title: "Real Time Products"});
        }
    catch(error){
        res.status(404).send(error)
    }
})


export default viewsRouter