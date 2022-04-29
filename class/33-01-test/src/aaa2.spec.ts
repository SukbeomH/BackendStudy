import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  beforeEach(() => {
    const appService = new AppService();
    const appController = new AppController(appService);
  });

  describe('gethelloe', () => {
    it('sdaf', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World');
    });
  });
});
