import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../Entities/Video.Entities';
import { UserService } from '../users/users.service';
import { v4 } from 'uuid';

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(Video)
		private readonly videoRepository: Repository<Video>,
		private readonly userService: UserService,
	) {}

	async getVideo(id: string): Promise<Video[]> {
		return await this.videoRepository.find({ where: { id: id } });
	}

	async createVideo(
		title: string,
		description: string,
		userId: string,
	): Promise<Video> {
		const user = await this.userService
			.getUser(userId)
			.then((user) => user[0]);

		const newVideo = {
			id: v4(),
			title: title,
			description: description,
			user: user,
			createdAt: new Date(),
		};

		return await this.videoRepository.save(newVideo);
	}
}
