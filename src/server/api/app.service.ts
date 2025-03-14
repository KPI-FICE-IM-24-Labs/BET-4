import e from 'express';

export class AppService {
  public getHello(req: e.Request, res: e.Response) {
    res.send("Hello, World!");
  }
}
