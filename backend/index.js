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


function enviarPedido(data){
    let pedidos;
  try {
    const { productosAComprar, nombre } = data;
    if (fs.existsSync("../data/pedidos.json")) {
        pedidos = JSON.parse(fs.readFileSync("../data/pedidos.json", "utf-8"));
    } else {
      pedidos = [];
    }
    pedidos.push(data);
    fs.writeFileSync("../data/pedidos.json", JSON.stringify(pedidos, null, 2));
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
subscribeGETEvent("sabores", enviarSabores);
subscribeGETEvent("productos", enviarProductos);
subscribePOSTEvent("pedido", enviarPedido);
startServer();
