import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true,
        maxLength: 60
    },
    category: {
        type: 'string',
        required: true,
        maxLength: 10
    },
    desc: {
        type: 'string',
        required: true,
        maxLength: 200
    },
    img: {
        type: 'string',
        required: true
    },
    prices: {
        type: [Number],
        required: true
    },
    extraOptions: {
        type: [{text: {type: String, required: true}, price: {type: Number, required: true}}]
    },
    reviews: [{userId: {type: String}, rating: {type: Number}, description: {type: String}}]
}, {timestamps: true});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);