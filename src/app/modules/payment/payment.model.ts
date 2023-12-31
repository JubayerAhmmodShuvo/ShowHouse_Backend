import mongoose, { Document, Schema } from 'mongoose';

export interface Payment extends Document {
  price: number;
  name: string;
  transactionId?: string;
  image?: string;
}
const paymentSchema = new Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Payment>('Payment', paymentSchema);
