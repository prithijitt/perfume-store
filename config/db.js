import mongoose from "mongoose";
import colors from "colors";

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connect to dababases ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`error in mongo db is ${error}`)
    }
}

export default connectdb;