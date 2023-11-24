import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/module/user/user.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'server is runnig',
  });
});
app.use('/api/users', userRoutes);

export default app;
