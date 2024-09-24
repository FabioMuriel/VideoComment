import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../Entities/Comment.Entities';
import { GenericResponse } from '../dtos/GenericResponse.dto';
import { v4 } from 'uuid';
import { UserService } from '../users/users.service';
import { VideoService } from '../video/video.service';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
		private readonly userService: UserService,
		private readonly videoService: VideoService,
    ) { }
    
    private async findCommentById(id: string): Promise<Comment> {
        return await this.commentRepository.findOne({ where: { id: id } });
    }

	async getComments(): Promise<GenericResponse<Comment[]>> {
        const comments = await this.commentRepository.find();
        
        const message = comments.length === 0
            ? 'No hay comentarios'
            : 'Comentarios encontrados correctamente';
        
		return GenericResponse.create<Comment[]>({
			status: true,
			message: message,
			data: comments,
		});
	}

	async createComment(content: string, videoId: string, userId: string): Promise<GenericResponse<Comment>> {
		const user = await this.userService
			.getUser(userId)
        
		const video = await this.videoService
			.getVideo(videoId)

		const newComment: Comment = {
			id: v4(),
			content: content,
			createdAt: new Date(),
			updatedAt: null,
			isDeleted: false,
			user: user.data,
			video: video.data,
        };
        
        const saveComment = await this.commentRepository.save(newComment);
        const message = saveComment ? 'Comentario creado correctamente' : 'Error al crear el comentario';

        return GenericResponse.create<Comment>({
            status: true,
            message: message,
            data: saveComment,
        });

	}

	async getComment(id: string): Promise<GenericResponse<Comment>> {
        const comment = await this.findCommentById(id);        
        const message = comment ? 'Comentario encontrado correctamente' : 'Comentario no encontrado';

		return GenericResponse.create<Comment>({
			status: true,
			message: message,
			data: comment,
		});
	}

    async updateComment(id: string, comment: Comment): Promise<GenericResponse<Comment>> {
        await this.findCommentById(id);
		await this.commentRepository.update(id, comment);
        const updatedComment = await this.getComment(id);
        const message = updatedComment ? 'Comentario actualizado correctamente' : 'Comentario no encontrado';

		return GenericResponse.create<Comment>({
			status: true,
			message: message,
			data: updatedComment.data,
		});
	}

    async deleteComment(id: string): Promise<GenericResponse<void>> {
        await this.findCommentById(id);
		const deletedComment = await this.commentRepository.update(id, { isDeleted: true });
        const message = deletedComment ? 'Comentario eliminado correctamente' : 'Error al eliminar el comentario';

		return GenericResponse.create<void>({
			status: true,
			message: message,
			data: null,
		});
	}
}
