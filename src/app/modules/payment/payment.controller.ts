
import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payment.service';
import catchAsync from '../../../shared/catchAsync';
import { PaymentDTO } from './payment.interface';

const createPayment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { data } = req.body;

      if (!data) {
        throw new Error('Invalid request body. Missing "data" property.');
      }

      const { price, name, transactionId } = data;

      const paymentDTO: PaymentDTO = { price, name, transactionId };

      const clientSecret = await PaymentService.createPayment(paymentDTO);

      if (clientSecret && clientSecret !== null) {
        console.log('Client Secret sent to front-end:', clientSecret);

        await saveDataToDatabase(paymentDTO);

        sendResponse(res, {
          statusCode: httpStatus.CREATED,
          success: true,
          message: 'Payment created successfully',
          clientSecret,
          payment: {
            price: paymentDTO.price,
            name: paymentDTO.name,
            transactionId: paymentDTO.transactionId,
          },
        });
      } else {
        console.error('Failed to get client secret from PaymentService');
        sendResponse(res, {
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: 'Failed to create payment',
        });
      }
    } catch (error) {
      console.error(error);

      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to create payment',
      });
    }
  }
);

const saveDataToDatabase = async (paymentDTO: PaymentDTO) => {
  try {
    console.log('Data saved to the database!');
  } catch (error) {
    console.error('Error saving data to the database:', error);
    throw new Error('Failed to save data to the database');
  }
};

export const PaymentController = {
  createPayment,
};
