import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/users/user.entity";

interface RequestWithCurrentUser{
    currentUser: User;
}

export const CurrentUser = createParamDecorator((data: never, context: ExecutionContext)=>{
    //the data is what we pass in to the decorator; ex: @CurrentUser('123'), here '123' is the data 
    //when we say *** never *** it means it doesnt take any argument
    
    
    //ExecutionContext can be http request or websocket or gRPC
    //now we want to use the request object so:
    const request = context.switchToHttp();
    const currentUser = request.getRequest<RequestWithCurrentUser>().currentUser;
    
    return currentUser;
});