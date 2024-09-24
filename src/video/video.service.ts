import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/users.service';
import { v4 } from 'uuid';
import { GenericResponse } from '../dtos/GenericResponse.dto';
import { Video } from './index';

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(Video)
		private readonly videoRepository: Repository<Video>,
		private readonly userService: UserService,
	) {}

	private async findVideoById(id: string): Promise<Video> {
		return await this.videoRepository.findOne({ where: { id: id } });
	}

	async getVideos(): Promise<GenericResponse<Video[]>> {
		const videos = await this.videoRepository.find();

		const message =
			videos.length === 0
				? 'No hay videos'
				: 'Videos encontrados correctamente';
		return GenericResponse.create<Video[]>({
			status: true,
			message,
			data: videos,
		});
	}

	async getVideo(id: string): Promise<GenericResponse<Video>> {
		const video = await this.videoRepository.findOne({
			where: { id: id },
			relations: ['comments'], 
		});

		const message = video
			? 'Video encontrado correctamente'
			: 'Video no encontrado';
		return GenericResponse.create<Video>({
			status: !!video,
			message,
			data: video,
		});
	}

	async createVideo(
		title: string,
		description: string,
		userId: string,
	): Promise<GenericResponse<Video>> {
		try {
			const user = await this.userService
				.getUser(userId)
				.then((res) => res.data);
			if (!user) throw new Error('Usuario no encontrado');

			const newVideo = this.videoRepository.create({
				id: v4(),
				title,
				description,
				user,
				createdAt: new Date(),
			});

			const video = await this.videoRepository.save(newVideo);
			return GenericResponse.create<Video>({
				status: true,
				message: 'Video creado correctamente',
				data: video,
			});
		} catch (error) {
			return GenericResponse.create<Video>({
				status: false,
				message: 'Error al crear el video',
				errors: [error.message],
			});
		}
	}

	async deleteVideo(id: string): Promise<GenericResponse<void>> {
		try {
			const video = await this.findVideoById(id);
			if (!video) {
				return GenericResponse.create<void>({
					status: false,
					message: 'Video no encontrado',
				});
			}

			await this.videoRepository.update(id, { isDeleted: true });
			return GenericResponse.create<void>({
				status: true,
				message: 'Video eliminado correctamente',
			});
		} catch (error) {
			return GenericResponse.create<void>({
				status: false,
				message: 'Error al eliminar el video',
				errors: [error.message],
			});
		}
	}

	async updateVideo(id: string, title: string, description: string): Promise<GenericResponse<Video>> {
		try {
			const video = await this.findVideoById(id);
			if (!video) {
				return GenericResponse.create<Video>({
					status: false,
					message: 'Video no encontrado',
				});
			}

			await this.videoRepository.update(id, { title, description });
			const updatedVideo = await this.findVideoById(id);
			return GenericResponse.create<Video>({
				status: true,
				message: 'Video actualizado correctamente',
				data: updatedVideo,
			});
		} catch (error) {
			return GenericResponse.create<Video>({
				status: false,
				message: 'Error al actualizar el video',
				errors: [error.message],
			});
		}
	}

	async getUserVideos(userId: string): Promise<GenericResponse<Video[]>> {
		const userVideos = await this.videoRepository.find({
			where: { user: { id: userId } },
		});

		const message =
			userVideos.length === 0
				? 'No hay videos'
				: 'Videos encontrados correctamente';
		return GenericResponse.create<Video[]>({
			status: true,
			message,
			data: userVideos,
		});
	}
}
