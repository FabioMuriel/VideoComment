import { Video } from '../Entities/Video.Entities';
import { GenericResponse } from '../dto/GenericResponse.dto';

export interface IVideoService {
    findVideoById(id: string): Promise<Video>;
    
    getVideos(): Promise<GenericResponse<Video[]>>;
    
    getDeletedVideos(): Promise<GenericResponse<Video[]>>;
    
    getVideo(id: string): Promise<GenericResponse<Video>>;
    
    createVideo(title: string, description: string, url: string, userId: string): Promise<GenericResponse<Video>>;
    
    deleteVideo(id: string): Promise<GenericResponse<void>>;
    
    updateVideo(id: string, title: string, description: string, url: string): Promise<GenericResponse<Video>>;
    
    getUserVideos(userId: string): Promise<GenericResponse<Video[]>>;
}
