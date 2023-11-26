### Create controller methods
- `listMessages()` to get all messages
    - add `@Get()` decorator before the method initialization
- `createMessage()` to add new message
    - add `@Post()` decorator before the method init.
    - to recieve request data we need to add `@Body()` decorator as parameter to receive the request data `@createMessage(@Body() body: any)` let's add the body as `any` now
- `getMessage()` to get one specific message
    - add `@Get()`

### Validating request data of createMessage
- Packages to be installed `npm install class-validator` and `npm install class-transformer`
- We will validate the request data before it reaches the route handler `(controller)` by using `Pipes`
- We can build our pipe by our selves but we will use the `ValidationPipe` which is provided by `nestjs` itself
- First step is to use the `ValidationPipe` go to `main.ts` file 
    - add instance of `ValidationPipe` in the `bootstrap` method and wrap it inside `app.useGlobalRoute()` which means this `ValidationPipe` in all routes only in case these routes have the rules
        ```
        async function bootstrap() {
            const app = await NestFactory.create(MessagesModule);
            app.useGlobalPipes(new ValidationPipe());
            await app.listen(3000);
        }
        ```
        and import the `ValidationPipe` from `@nestjs/common`
- Second step to use `ValidationPipe` is to create a class that describes the different properties that the request body should have `Data Transfer Object (dto)`
- Inside our folder of messages we will create new folder called `dto` then create new file `create-message.dto.ts` for the `createMessage` method
    - This dto file will have the type of the fields which should be included in the request body
    - add `export for the class`
        ```
        export class CreateMessageDto {
            content: string;
        }
        ```
- Third step is to add the validation rules to the class
- Go to the DTO file and add the validation rules
    - for our case the content field must be a string so will add `@IsString()` decorator before the field
        ```
        import { IsString } from "class-validator";

        export class CreateMessageDto {
            @IsString()
            content: string;
        }
        ```
- Last step is to import the `dto` file and recieve the request into it
    ```
    @Post()
    createMessage(@Body() body: CreateMessageDto) { }
    ```

### Validation in deep
- `class-transformer` is a package which converts plain object to an instance of a class
- `class-validator` handles validation on properties of a class using decorator

### Steps of Validation Pipe
- Use `class-transformer` to convert the body of the request into a `DTO` class.
- Use `class-validator` to validate the instance.
- If the validation has errors will return, otherwise provide the body to request handler.

### How the validation worked despite type annotation isn't in JS
- If you see that the `DTO` file which has the validation rules is used as `type` for the request body
- After building our code, it will be converted to `JS` code which don't have types
- Means the validation rules won't work in `JS` ! 
- The resposne in the key `emitDecoratorMetadata` in `tsconfig.json` which allows some types in `TS` to be converted in `JS` and make validation working in the case.