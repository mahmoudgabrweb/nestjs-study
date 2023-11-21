import { Controller, Get, INestApplication, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

@Controller()
class AppController {
    @Get()
    getRootRoute() {
        return "hi";
    }
}

@Module({
    controllers: [AppController]
})
class AppModule { }

async function bootstrap() {
    const app: Promise<INestApplication> = NestFactory.create(AppModule);
    (await app).listen(3000);
}

bootstrap();