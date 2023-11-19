import { RequestHandler } from 'express';
import { PaymentService } from './payment.service';

const createPayment: RequestHandler = async (req, res, next) => {
 

  try {
    const data = req.body;
    const sessions = await PaymentService.createCheckoutSession(data);
    
    res.status(200).json({
      status: 200,
      message: 'payment created successfully',
      data: sessions,
    });
  } catch (err) {
  
    next(err);
  }
};

export const PaymentController = {
  createPayment,
};
