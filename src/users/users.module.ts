import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entities/User.Entities';
import { forwardRef } from '@nestjs/common';
import { VideoModule } from '../video/video.module';
import { IVideoService } from '../interfaces/VideoService.interface';
@Module({
	imports: [TypeOrmModule.forFeature([User]), forwardRef(() => VideoModule)],
	providers: [UserService],
	controllers: [UsersController],
	exports: [UserService],
})
export class UserModule {}
