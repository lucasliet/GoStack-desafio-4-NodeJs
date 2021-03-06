import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const transactionService = new CreateTransactionService(transactionsRepository);

transactionRouter.get('/', (request, response) => {
  try {
    return response.json(transactionsRepository.all());
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    return response.json(transactionService.execute({ title, value, type }));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
