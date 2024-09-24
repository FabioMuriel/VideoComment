import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../Entities/Comment.Entities';
import { UserService } from '../users/users.service';
import { VideoService } from '../video/video.service';
import { User } from '../Entities/User.Entities';
import { Video } from '../Entities/Video.Entities';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Video])],
  providers: [CommentService, UserService, VideoService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
