import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from '../Entities/Video.Entities';
import { VideoCreateDto } from '../dtos/videoCreate.dto';

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get(':id')
	async getVideos(@Param('id') id: string): Promise<Video[]> {
		return await this.videoService.getVideo(id);
	}

	@Post()
	async createVideo(@Body() video: VideoCreateDto): Promise<Video> {
		return await this.videoService.createVideo(
			video.title,
			video.description,
			video.userId,
		);
	}
}
