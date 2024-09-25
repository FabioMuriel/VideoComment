import { Module } from '@nestjs/common';
import { ApiconfigService } from './apiconfig.service';
import { ApiconfigController } from './apiconfig.controller';

@Module({
  providers: [ApiconfigService],
  controllers: [ApiconfigController]
})
export class ApiconfigModule {}
