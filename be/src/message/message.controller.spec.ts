import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { MessageService } from './message.service';
import { MessageModule } from './message.module';
import { AppModule } from '../app.module';

describe('MessageController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CacheModule.register(), MessageModule],
      controllers: [MessageController],
      providers: [MessageService],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
