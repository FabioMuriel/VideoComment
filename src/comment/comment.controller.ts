import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '../Entities/Comment.Entities';

@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService) {}

    @Post()
    async createComment(@Body() comment: Comment): Promise<Comment> {
        return await this.commentService.createComment(comment);
    }

    @Get(':id')
    async getComment(@Param('id') id: string): Promise<Comment> {
        return await this.commentService.getComment(id);
    }

    @Put(':id')
    async updateComment(@Param('id') id: string, @Body() comment: Comment): Promise<Comment> {
        return await this.commentService.updateComment(id, comment);
    }

    @Delete(':id')
    async deleteComment(@Param('id') id: string): Promise<void> {
        await this.commentService.deleteComment(id);
    }
}
