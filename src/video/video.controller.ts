import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from '../Entities/Video.Entities';
import { VideoCreateDto } from '../dtos/videoCreate.dto';
import { VideoUpdateDto } from '../dtos/videUpdate.dto';

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
    
    @Delete(':id')
    async deleteVideo(@Param('id') id: string): Promise<void> {
        return await this.videoService.deleteVideo(id);
    }

    @Put(':id')
    async updateVideo(@Param('id') id: string, @Body() video: VideoUpdateDto): Promise<Video> {
        return await this.videoService.updateVideo(id, video);
    }

    @Get(':id/videos')
    async getUserVideos(@Param('id') id: string): Promise<Video[]> {
        return await this.videoService.getUserVideos(id);
    }
}
