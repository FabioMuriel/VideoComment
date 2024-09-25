import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../Entities/Comment.Entities';
import { GenericResponse } from '../dto/GenericResponse.dto';
import { v4 } from 'uuid';
import { UserService } from '../users/users.service';
import { VideoService } from '../video/video.service';
import { ICommentService } from '../interfaces/CommentService.interface';

@Injectable()
export class CommentService implements ICommentService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
		private readonly userService: UserService,
		private readonly videoService: VideoService,
	) {}

	async findCommentById(id: string): Promise<Comment> {
		return await this.commentRepository.findOne({ where: { id: id } });
	}

	async getComments(): Promise<GenericResponse<Comment[]>> {
		const comments = await this.commentRepository.find();

		const message =
			comments.length === 0
				? 'No hay comentarios'
				: 'Comentarios encontrados';

		return GenericResponse.create<Comment[]>({
			status: true,
			message: message,
			data: comments,
		});
	}

	async createComment(
		content: string,
		videoId: string,
		userId: string,
	): Promise<GenericResponse<Comment>> {
		const user = await this.userService.getUser(userId);
		if (!user || !user.status) {
			return GenericResponse.create<Comment>({
				status: false,
				message: 'Error al crear el comentario: Usuario no encontrado',
				data: null,
			});
		}

		const video = await this.videoService.findVideoById(videoId);
		if (!video) {
			return GenericResponse.create<Comment>({
				status: false,
				message: 'Error al crear el comentario: Video no encontrado',
				data: null,
			});
		}

		const newComment: Comment = {
			id: v4(),
			content: content,
			createdAt: new Date(),
			updatedAt: null,
			isDeleted: false,
			user: user.data,
			video: video,
		};

		const saveComment = await this.commentRepository.save(newComment);
		const message = saveComment
			? 'Comentario creado correctamente'
			: 'Error al crear el comentario';

		return GenericResponse.create<Comment>({
			status: !!saveComment,
			message: message,
			data: saveComment,
		});
	}

	async getComment(id: string): Promise<GenericResponse<Comment>> {
		const comment = await this.findCommentById(id);
		const message = comment
			? 'Comentario encontrado'
			: 'Comentario no encontrado';

		if (!comment) {
			return GenericResponse.create<Comment>({
				status: false,
				message: message,
				data: null,
			});
		}

		return GenericResponse.create<Comment>({
			status: true,
			message: message,
			data: comment,
		});
	}

	async updateComment(
		id: string,
		commentContent: string,
	): Promise<GenericResponse<Comment>> {
		const comment = await this.findCommentById(id);
		if (!comment) {
			return GenericResponse.create<Comment>({
				status: false,
				message: 'Comentario no encontrado',
				data: null,
			});
		}

		await this.commentRepository.update(id, {
			content: commentContent,
			updatedAt: new Date(),
		});
		const updatedComment = await this.getComment(id);
		const message = updatedComment
			? 'Comentario actualizado correctamente'
			: 'Comentario no encontrado';

		return GenericResponse.create<Comment>({
			status: true,
			message: message,
			data: updatedComment.data,
		});
	}

	async deleteComment(id: string): Promise<GenericResponse<void>> {
		try {
			const comment = await this.findCommentById(id);
			if (!comment) {
				return GenericResponse.create<void>({
					status: false,
					message: 'Comentario no encontrado',
				});
			}
			await this.commentRepository.update(id, { isDeleted: true });
			return GenericResponse.create<void>({
				status: true,
				message: 'Comentario eliminado correctamente',
			});
		} catch (error) {
			return GenericResponse.create<void>({
				status: false,
				message: 'Error al eliminar el comentario',
				errors: [error.message],
			});
		}
	}

	async getVideoComments(id: string): Promise<GenericResponse<Comment[]>> {
		try {
			const video = await this.videoService.findVideoById(id);

			if (!video) {
				return GenericResponse.create<Comment[]>({
					status: false,
					message: 'Video no encontrado',
					data: null,
				});
			}

			const comments = await this.commentRepository.find({
				where: { video: { id: id } },
				relations: ['user'],
			});

			const message =
				comments.length === 0
					? 'No hay comentarios'
					: 'Comentarios encontrados';

			return GenericResponse.create<Comment[]>({
				status: true,
				message: message,
				data: comments,
			});
		} catch (error) {
			return GenericResponse.create<Comment[]>({
				status: false,
				message: 'Error al obtener los comentarios',
				errors: [error.message],
			});
		}
	}
}
