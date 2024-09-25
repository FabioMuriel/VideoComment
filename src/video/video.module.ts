import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../Entities/Video.Entities';
import { UserModule } from '../users/users.module';
import { forwardRef } from '@nestjs/common';

@Module({
	imports: [TypeOrmModule.forFeature([Video]), forwardRef(() => UserModule)],
  providers: [VideoService],
  controllers: [VideoController],
  exports: [VideoService],
})
export class VideoModule {}
