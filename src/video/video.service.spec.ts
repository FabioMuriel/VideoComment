import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Video } from '../entities/Video.Entities';
import { Repository } from 'typeorm';
import { User } from '../entities/User.Entities';
import { UserService } from '../users/users.service';

describe('VideoService', () => {
	let service: VideoService;
	let videoRepository: Repository<Video>;
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				VideoService,
				{
					provide: getRepositoryToken(Video),
					useClass: Repository,
				},
				{
					provide: UserService,
					useValue: {
						getUser: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<VideoService>(VideoService);
		videoRepository = module.get<Repository<Video>>(
			getRepositoryToken(Video),
		);
		userService = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create a video', async () => {
		const user = {
			id: '1',
			name: 'John',
			email: 'john@example.com',
			password: 'password',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const video = {
			title: 'Video Title',
			description: 'Video Description',
			user: user,
		};
		
		jest.spyOn(userService, 'getUser').mockResolvedValue({
			status: true,
			message: 'Usuario encontrado',
			data: user as User,
		});

		jest.spyOn(videoRepository, 'save').mockResolvedValue(video as any);

		const result = await service.createVideo(
			'Video Title',
			'Video Description',
			'1', // userId
		);

		expect(result.status).toBe(true);
		expect(result.data).toEqual(video as Video);
	});

	it('should throw an error when user not found while creating video', async () => {
		jest.spyOn(userService, 'getUser').mockResolvedValue({
			status: false,
			message: 'Usuario no encontrado',
		});

		const result = await service.createVideo(
			'Video Title',
			'Video Description',
			'non-existing-id',
		);
		expect(result.status).toBe(false);
		expect(result.message).toBe('Error al crear el video');
	});

	it('should return a video', async () => {
		const video = {
			id: '1',
			title: 'Video Title',
			description: 'Video Description',
		};
		jest.spyOn(videoRepository, 'findOne').mockResolvedValue(video as any);

		const result = await service.getVideo('1');
		expect(result.status).toBe(true);
		expect(result.data).toEqual(video);
	});

	it('should return not found message when video does not exist', async () => {
		jest.spyOn(videoRepository, 'findOne').mockResolvedValue(null);

		const result = await service.getVideo('non-existing-id');
		expect(result.status).toBe(false);
		expect(result.message).toBe('Video no encontrado');
	});

	it('should delete a video', async () => {
		const video = {
			id: '1',
			title: 'Video Title',
			description: 'Video Description',
		};
		jest.spyOn(videoRepository, 'findOne').mockResolvedValue(video as any);
		jest.spyOn(videoRepository, 'update').mockResolvedValue(undefined);

		const result = await service.deleteVideo('1');
		expect(result.status).toBe(true);
		expect(result.message).toBe('Video eliminado correctamente');
	});

	it('should return not found message when deleting a non-existing video', async () => {
		jest.spyOn(videoRepository, 'findOne').mockResolvedValue(null);

		const result = await service.deleteVideo('non-existing-id');
		expect(result.status).toBe(false);
		expect(result.message).toBe('Video no encontrado');
	});
});
