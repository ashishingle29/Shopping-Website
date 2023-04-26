import mongoose from "mongoose";
const CarouselSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})


export default mongoose.model('Carousel',CarouselSchema);
