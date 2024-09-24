import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../Entities/Comment.Entities';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async createComment(comment: Comment): Promise<Comment> {
        return await this.commentRepository.save(comment);
    }

    async getComment(id: string): Promise<Comment> {
        return await this.commentRepository.findOne({ where: { id: id } });
    }

    async updateComment(id: string, comment: Comment): Promise<Comment> {
        await this.commentRepository.update(id, comment);
        return await this.commentRepository.findOne({ where: { id: id } });
    }

    async deleteComment(id: string): Promise<void> {
        await this.commentRepository.delete(id);
    }
}
