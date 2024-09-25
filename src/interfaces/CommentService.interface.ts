import { GenericResponse } from '../dto/GenericResponse.dto';
import { Comment } from '../Entities/Comment.Entities';

export interface ICommentService {
	findCommentById(id: string): Promise<Comment>;

	getComments(): Promise<GenericResponse<Comment[]>>;

	createComment(
		content: string,
		videoId: string,
		userId: string,
    ): Promise<GenericResponse<Comment>>;

	getComment(id: string): Promise<GenericResponse<Comment>>;

	updateComment(
		id: string,
		content: string,
	): Promise<GenericResponse<Comment>>;

    deleteComment(id: string): Promise<GenericResponse<void>>;
    
    getVideoComments(id: string): Promise<GenericResponse<Comment[]>>;
}
