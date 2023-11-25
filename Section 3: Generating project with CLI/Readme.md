## Install NestJS CLI
Run the command `npm i -g @nestjs/cli`

To create new project using this command use `nest new projectName`

We will go for a small project of messages CRUD (create and retreive messages).

### Project details
- First API `GET http://localhost:3000/messages` this API doesn't require `(Pipe, Guard)` as there is no data to validate nor authorization
- Second API `POST http://localhost:3000/messages {content: "hi}`, here we will need `(Pipe)` to validate the data
- Third API `GET http://localhost:3000/messages/:id` will be same as the first API

To run the project in dev mode will use the command `npm run start:dev`

First we will clean our code and remove all `AppController, AppModule, AppService` so we can start with our files.

### Module implementation
- Generate our module using `nest generate module messages`, then update the `main.ts` file with `MessagesModule` instead of `AppModule`
- Generate controller using `nest generate controller messages` this will create the controller file and the testing file for `controller` then update the `module` file 
    - the update of the module is 
    ```
    @Module({
        controllers: [MessagesController]
    })
    ```
    - if tou need to create a controller in specific file you can use `nest generate controller folderName/controllerName --flat`

### Routing
- Option 1: to add the `messages` in the controller decorator like `@Controller('messages')` then in the methods you can use `@Get(), @Post(), @Get(":/id")`.
- Option 2: to add in each method the route separately `@Get("/messages"), @Post("/messages"), @Get("/messages/:id")`
