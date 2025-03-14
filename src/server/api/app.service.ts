import e from 'express';

export class AppService {
  public getHello(req: e.Request, res: e.Response) {
    res.send("Hello, World!");
  }

  public searchCity(req: e.Request, res: e.Response) {
    res.render('index.hbs');
  }
}
