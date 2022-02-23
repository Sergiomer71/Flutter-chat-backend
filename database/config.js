

const { default: mongoose } = require('mongoose');
const mongooe = require('mongoose');


const dbConnection = async () => {

try {

    // console.log('init db config')

    await mongoose.connect( process.env.DB_CNN,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true

        useNewUrlParser: true, 
        useUnifiedTopology: true

    });

    console.log('DB Online');
    
} catch (error) {
    console.log(error);
    throw new Error('Error en la base de datos - Hable ocn el admin');
    
}

}

module.exports = {
    dbConnection
}