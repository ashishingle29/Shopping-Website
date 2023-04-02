import mongoose from "mongoose";

const secretWordSchema=new mongoose.Schema({
    list:{
        type:Array,
    }
});

export default mongoose.model("secretwords",secretWordSchema);
