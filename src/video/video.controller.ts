import {Controller, Get, Post, Delete, Put, Body, Param, BadRequestException} from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoCreateDto } from '../dtos/videoCreate.dto';
import { VideoUpdateDto } from '../dtos/videoUpdate.dto';

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get()
	async getVideos() {
		const result = await this.videoService.getVideos();
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
	async getVideo(@Param('id') id: string) {
		const result = await this.videoService.getVideo(id);
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
	async createVideo(@Body() video: VideoCreateDto) {
		const result = await this.videoService.createVideo(
			video.title,
			video.description,
			video.userId,
		);
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
	async deleteVideo(@Param('id') id: string) {
		const result = await this.videoService.deleteVideo(id);
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
	async updateVideo(@Param('id') id: string, @Body() video: VideoUpdateDto) {
		const result = await this.videoService.updateVideo(id, video);
		if (!result.status) {
			throw new BadRequestException(result.message);
		}
		return {
			status: result.status,
			message: result.message,
			data: result.data
		};
	}

	@Get(':id/videos')
	async getUserVideos(@Param('id') id: string) {
		const result = await this.videoService.getUserVideos(id);
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
