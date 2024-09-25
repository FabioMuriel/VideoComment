import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../Entities/Comment.Entities';
import { UserModule } from '../users/users.module';
import { VideoModule } from '../video/video.module';
import { User } from '../Entities/User.Entities';
import { Video } from '../Entities/Video.Entities';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Video]), UserModule, VideoModule],
  providers: [CommentService],  
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
