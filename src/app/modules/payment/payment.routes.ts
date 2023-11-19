import express from 'express';

import { UserRole } from '../../../enum/user';
import auth from '../../middlewares/auth';
import { PaymentController } from './payment.controller';


const router = express.Router();

router.post(
  '/create-payment',
  auth(UserRole.User),
  PaymentController.createPayment
);



export const PaymentRoutes = router;
