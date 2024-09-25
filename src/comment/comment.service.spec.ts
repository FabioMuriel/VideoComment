import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from '../Entities/Comment.Entities';
import { Repository } from 'typeorm';
import { UserService } from '../users/users.service';
import { VideoService } from '../video/video.service';
import { GenericResponse } from '../dto/GenericResponse.dto';
import { Video } from '../entities/Video.Entities';
import { User } from '../entities/User.Entities';

describe('CommentService', () => {
	let service: CommentService;
	let commentRepository: Repository<Comment>;
	let userService: UserService;
	let videoService: VideoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CommentService,
				{
					provide: getRepositoryToken(Comment),
					useClass: Repository,
				},
				{
					provide: UserService,
					useValue: {
						getUser: jest.fn(),
					},
				},
				{
					provide: VideoService,
					useValue: {
						findVideoById: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<CommentService>(CommentService);
		commentRepository = module.get<Repository<Comment>>(
			getRepositoryToken(Comment),
		);
		userService = module.get<UserService>(UserService);
		videoService = module.get<VideoService>(VideoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create a comment', async () => {
		const user = { id: '1', name: 'John' };
		const video = { id: '1', title: 'Video Title' };
		const comment = {
			id: '1',
			content: 'Great video!',
			createdAt: new Date(),
			user,
			video,
		};

		jest.spyOn(userService, 'getUser').mockResolvedValue({
			status: true,
			data: user as User,
			message: 'Usuario encontrado',
		});
		jest.spyOn(videoService, 'findVideoById').mockResolvedValue(
			video as Video,
		);
		jest.spyOn(commentRepository, 'save').mockResolvedValue(
			comment as Comment,
		);

		const result = await service.createComment('Great video!', '1', '1');
		expect(result.status).toBe(true);
		expect(result.data).toEqual(comment);
	});

	it('should throw an error when user not found while creating comment', async () => {
		jest.spyOn(userService, 'getUser').mockResolvedValue({
			status: false,
			message: 'Usuario no encontrado',
		});

		const result = await service.createComment(
			'Great video!',
			'1',
			'non-existing-id',
		);
		expect(result.status).toBe(false);
		expect(result.message).toBe(
			'Error al crear el comentario: Usuario no encontrado',
		);
	});

	it('should throw an error when video not found while creating comment', async () => {
		const user = { id: '1', name: 'John' };
		jest.spyOn(userService, 'getUser').mockResolvedValue({
			status: true,
			data: user as User,
			message: 'Usuario encontrado',
		});
		jest.spyOn(videoService, 'findVideoById').mockResolvedValue(null);

		const result = await service.createComment(
			'Great video!',
			'non-existing-id',
			'1',
		);
		expect(result.status).toBe(false);
		expect(result.message).toBe(
			'Error al crear el comentario: Video no encontrado',
		);
	});

	it('should return a comment', async () => {
		const comment = { id: '1', content: 'Great video!' };
		jest.spyOn(commentRepository, 'findOne').mockResolvedValue(
			comment as Comment,
		);

		const result = await service.getComment('1');
		expect(result.status).toBe(true);
		expect(result.data).toEqual(comment);
	});

	it('should return not found message when comment does not exist', async () => {
		jest.spyOn(commentRepository, 'findOne').mockResolvedValue(null);

		const result = await service.getComment('non-existing-id');
		expect(result.status).toBe(false);
		expect(result.message).toBe('Comentario no encontrado');
	});

	it('should update a comment', async () => {
		const comment = { id: '1', content: 'Updated comment' };
		jest.spyOn(commentRepository, 'findOne').mockResolvedValue(
			comment as Comment,
		);
		jest.spyOn(commentRepository, 'update').mockResolvedValue(undefined);
		jest.spyOn(service, 'getComment').mockResolvedValue({
			status: true,
			data: comment as Comment,
			message: 'Comentario encontrado',
		});

		const result = await service.updateComment('1', 'Updated comment');
		expect(result.status).toBe(true);
		expect(result.data).toEqual(comment);
	});

	it('should return not found message when updating a non-existing comment', async () => {
		jest.spyOn(commentRepository, 'findOne').mockResolvedValue(null);

		const result = await service.updateComment(
			'non-existing-id',
			'Updated comment',
		);
		expect(result.status).toBe(false);
		expect(result.message).toBe('Comentario no encontrado');
	});

	it('should delete a comment', async () => {
		const comment = {
			id: '1',
			content: 'Great video!',
			createdAt: new Date(),
			updatedAt: null,
			isDeleted: false,
			user: {
				id: '1',
				name: 'John',
				email: 'john@example.com',
				password: 'password',
				createdAt: new Date(),
				isDeleted: false,
				updatedAt: null,
			},
			video: {
				id: '1',
				title: 'Video Title',
				description: 'Video Description',
				createdAt: new Date(),
				updatedAt: null,
				isDeleted: false,
			},
		};

		jest.spyOn(commentRepository, 'findOne').mockResolvedValue(
			comment as Comment,
		);
		jest.spyOn(commentRepository, 'update').mockResolvedValue(undefined);

		const result = await service.deleteComment('1');
		expect(result.status).toBe(true);
		expect(result.message).toBe('Comentario eliminado correctamente');
	});

	it('should return not found message when deleting a non-existing comment', async () => {
		jest.spyOn(commentRepository, 'findOne').mockResolvedValue(null);

		const result = await service.deleteComment('non-existing-id');
		expect(result.status).toBe(false);
		expect(result.message).toBe('Comentario no encontrado');
	});
});
