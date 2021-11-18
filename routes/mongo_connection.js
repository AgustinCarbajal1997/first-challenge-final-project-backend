const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://magustincarbajal97:NXwUMBbedSFQhGID@cluster0.xkitr.mongodb.net/ecommerceReact?retryWrites=true&w=majority";

mongoose.connect(connectionString)
    .then(()=>{
        console.log("Conexion exitosa a DB");
    })
    .catch((error)=>{
        console.log("Ocurrio un error en la conexion", error);
    })

