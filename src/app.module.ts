import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entities/User.Entities';
import { Video } from './Entities/Video.Entities';
import { Comment } from './Entities/Comment.Entities';

@Module({
	imports: [
		CommentModule,
		UserModule,
		VideoModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'src/config/database.sqlite',
			entities: [User, Video, Comment],
			//TODO: Cambiar a true cuando se quiera que se sincronice la base de datos
			synchronize: true,
		}),
		TypeOrmModule.forFeature([User, Video, Comment]),
	],
})
export class AppModule {}
