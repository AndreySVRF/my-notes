import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('My Notes App')
		.setDescription('Documentation REST API')
		.setVersion('1.0.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('/api/docs', app, document);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		})
	);

	await app.listen(PORT);
}

bootstrap();
