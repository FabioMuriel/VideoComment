import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entities/User.Entities';
import { Video } from '../Entities/Video.Entities';

@Module({
	imports: [TypeOrmModule.forFeature([User, Video])],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
