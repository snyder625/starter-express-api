import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    productId: {
        type: 'string',
        required: true
    },
}, {timestamps: true});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);