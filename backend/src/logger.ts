export function logRoute(fn: Function) {
  return async (req: any, res: any, next: any) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };
}
