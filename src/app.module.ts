import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entities/User.Entities';
import { Video } from './Entities/Video.Entities';
import { Comment } from './Entities/Comment.Entities';
import { ApiKeyMiddleware } from './middlewares/api-key/api-key.middleware';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';

@Module({
	imports: [
		CommentModule,
		UserModule,
		VideoModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'src/config/database.sqlite',
			entities: [User, Video, Comment],
			synchronize: false,
		}),
		TypeOrmModule.forFeature([User, Video, Comment]),
	],
})
	
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ApiKeyMiddleware)
			.forRoutes('*');
	}
}
