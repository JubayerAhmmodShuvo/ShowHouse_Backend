import express from 'express';
import { UserRoutes } from '../modules/user/users.routes';
import { UserAuth } from '../modules/auth/auth.route';
import { ProductRoutes } from '../modules/product/product.routes';



const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: UserAuth,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
