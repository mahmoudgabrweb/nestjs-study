## Create project from scratch
### First we will install packages.json in empty project
- `npm init -y`  (this will create the package.json file)
- `npm install`

Now the node_modules folder is installed and will start installing packages which we will need in the project

- `npm install @nestjs/common@7.6.17` (Has vast majority of functions, classes that we need from nest).
- `npm install @nestjs/core@7.6.17`
- `npm install @nestjs/platform-express@7.6.17`
    - It handles requests (it adapt express js to use it inside nestjs).
    - Nest itself doesn’t handle incoming requests instead so we need outside implementation to handle http requests for it and respond with it.
    - We have 2 options (Express, Fastify) the default one is express 
- `npm install reflect-metadata@0.1.13` (to use Decorators)
- `npm install typescript@4.3.2`


After install all packages, create the `tsconfig.json` file
```
{
    "CompilerOptions": {
        "module": "CommonJS",
        "target": "ES2017",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

### Controllers
What is the request life cycle
``` 
Request -> validate data contained in the request (Pipe) 
        -> make sure the user is authenticated and authorized for this request (Guard) 
        -> Route the request to a particular function (through the controller) 
        -> Run business login (Through the service) 
        -> access the storage (Repository)
```

### Parts of nest
    - Controllers -> handles incoming request
    - Services -> handle data access and business logic
    - Modules -> Groups together code
    - Pipes -> Validate incoming data
    - Filters -> Handle errors that occur during request handling
    - Guards -> Handles authentication / authorization
    - Interceptors -> Add extra logic to incoming requests of outgoing responses
    - Repositories -> Handles data stored in DB

### Build an application from scratch
- create `main.ts` file

```
@Controller()
Class AppController {
	@Get()
	getRootRoute() {		// to create route of the base url
		return “hi”;
	}
}

@Module({
	controllers: [AppController]
})
Class AppModule {}

Async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
}

bootstrap();
```

So now when the application run it will look into the app module then will go to it’s decorator
Take all of these controllers and take instances from them

The function which is being called whenever we are starting the application is async function and by default it’s common to call it bootstrap


To run the application as file use `npx ts-node-dev src/main.ts`

### Clean code
- Now create AppController file and move the controller code inside it
- Create AppModule file and move the module code inside it