import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { KAFKA_CLIENT, KAFKA_GROUPID, KAFKA_SERVER } from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: KAFKA_CLIENT,
        brokers: [KAFKA_SERVER],
      },
      consumer: {
        groupId: KAFKA_GROUPID,
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000, () => {
    new Logger('boostrap').log(
      `Lending service is running at port: 3000 - kafka :`,
    );
  });
}
bootstrap();
