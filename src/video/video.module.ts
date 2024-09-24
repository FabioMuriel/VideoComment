import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../Entities/Video.Entities';
import { UserModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), UserModule],
  providers: [VideoService],
  controllers: [VideoController],
  exports: [VideoService],
})
export class VideoModule {}
