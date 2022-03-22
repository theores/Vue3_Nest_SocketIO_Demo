import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketTestModule } from './socket-test/socket-test.module';

@Module({
  imports: [SocketTestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
