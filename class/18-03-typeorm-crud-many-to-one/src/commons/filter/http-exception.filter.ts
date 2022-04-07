import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
// implements : 단순히 기능을 상속받는 것이 아니라, 그 기능을 안에서 구현해줘야한다
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;
    console.log('=================================');
    console.log('ERROR : ');
    console.log(message);
    console.log(status);
    console.log('=================================');
  }
}
