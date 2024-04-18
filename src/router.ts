import { Router } from 'express';

import { body, validationResult } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/products';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/updates';

const router = Router();
const errorHandlerInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
    return;
  } else {
    next();
  }
};

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  [body('name').isString(), errorHandlerInputs],
  updateProduct
);
router.post(
  '/product/',
  [body('name').isString(), errorHandlerInputs],
  createProduct
);
router.delete('/product/:id', deleteProduct);

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
  '/update/:id',
  [
    body('title').optional(),
    body('body').optional(),
    body('version').optional(),
    body('status')
      .isIn([body('IN_PROGRESS'), body('SHIPPED'), body('DEPRECATED')])
      .optional(),
    errorHandlerInputs,
  ],
  updateUpdate
);
router.post(
  '/update',
  [
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    errorHandlerInputs,
  ],
  createUpdate
);
router.delete('/update/:id', deleteUpdate);

// put replace all the data
// patch replace a part of the data

router.get('/updatepoints', () => {});
router.get('/updatepoints/:id', () => {});
router.put(
  '/updatepoints/:id',
  [
    body('name').optional().isString(),
    body('description').optional().isString(),
    errorHandlerInputs,
  ],
  () => {}
);
router.post('/updatepoints/', () => {});
router.delete(
  '/updatepoints/:id',
  [
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    errorHandlerInputs,
  ],
  () => {}
);

export default router;
