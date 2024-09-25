import { Controller, Post, Body, Get, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentCreateDto } from '../dtos/CommentCreate.dto';
import { CommentUpdateDto } from '../dtos/CommentUpdate.dto';

@Controller('comments')
export class CommentController {

    constructor(private readonly commentService: CommentService) { }
    
    @Get()
    async getComments() {
        const result = await this.commentService.getComments();
        if (!result.status) {
            throw new BadRequestException(result.message);
        }
        return {
            status: result.status,
            message: result.message,
            data: result.data
        };
    }

    @Get(':id')
    async getComment(@Param('id') id: string) {
        const result = await this.commentService.getComment(id);
        if (!result.status) {
            throw new BadRequestException(result.message);
        }
        return {
            status: result.status,
            message: result.message,
            data: result.data
        };
    }

    @Post()
    async createComment(@Body() comment: CommentCreateDto) {
        const result = await this.commentService.createComment(comment.content, comment.videoId, comment.userId);
        if (!result.status) {
            throw new BadRequestException(result.message);
        }
        return {
            status: result.status,
            message: result.message,
            data: result.data
        };
    }
    

    @Put(':id')
    async updateComment(@Param('id') id: string, @Body() comment: CommentUpdateDto) {
        const result = await this.commentService.updateComment(id, comment.content);
        if (!result.status) {
            throw new BadRequestException(result.message);
        }
        return {
            status: result.status,
            message: result.message,
            data: result.data
        };
    }

    @Delete(':id')
    async deleteComment(@Param('id') id: string) {
        const result = await this.commentService.deleteComment(id);
        if (!result.status) {
            throw new BadRequestException(result.message);
        }
        return {
            status: result.status,
            message: result.message,
            data: result.data
        };
    }
}
