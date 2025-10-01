import{
    subscribeGETEvent, 
    subscribePOSTEvent, 
    realTimeEvent, 
    startServer } from "soquetic";
    import fs from "fs"

function enviarSabores(){
    let sabores = JSON.parse(fs.readFileSync("../data/sabores.json", "utf-8"));
    return sabores;
}
function enviarProductos(){
    let productos = JSON.parse(fs.readFileSync("../data/productos.json", "utf-8"));
    return productos;
}
function enviarPedido(producto, sabores, nombre){
    let pedido = {producto: producto, sabores: sabores, nombre: nombre};
    pedido = JSON.stringify(pedido, null, 2);
    fs.writeFileSync("../data/pedidos.json", pedido);
    return {ok:true};
}
subscribeGETEvent("sabores", enviarSabores);
subscribeGETEvent("productos", enviarProductos);
subscribePOSTEvent("pedido", enviarPedido);
startServer();
