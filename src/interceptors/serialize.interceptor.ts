import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';


export function serialize(dto:any){
  return UseInterceptors(new SerializeInterceptor(dto))
}


 class SerializeInterceptor implements NestInterceptor {
  constructor(private dto:any){}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    )
    .pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        // message: data.message,
        timestamp: new Date().toISOString(),
        data: data,
      })),
    )
    ;
  }
}
