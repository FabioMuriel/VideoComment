import { User } from '../Entities/User.Entities';
import { GenericResponse } from '../dto/GenericResponse.dto';
import { Video } from '../Entities/Video.Entities';

export interface IUsersService {
	findUserById(id: string): Promise<User>;

	getUsers(): Promise<GenericResponse<User[]>>;

	getDeletedUsers(): Promise<GenericResponse<User[]>>;

	getUser(id: string): Promise<GenericResponse<User>>;

	getUserVideos(userId: string): Promise<GenericResponse<Video[]>>;

	createUser(
		name: string,
		email: string,
		password: string,
	): Promise<GenericResponse<User>>;

	updateUser(
		id: string,
		name: string,
		email: string,
		password: string,
	): Promise<GenericResponse<User>>;

	deleteUser(id: string): Promise<GenericResponse<void>>;
}
