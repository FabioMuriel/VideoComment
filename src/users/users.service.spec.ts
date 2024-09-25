import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../Entities/User.Entities';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { VideoService } from '../video/video.service';

describe('UserService', () => {
	let service: UserService;
	let userRepository: Repository<User>;
	let videoService: VideoService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(User),
					useClass: Repository,
				},
				{
					provide: VideoService,
					useValue: {
						getUserVideos: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
		userRepository = module.get<Repository<User>>(getRepositoryToken(User));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create a user', async () => {
		const user = {
			id: '1',
			name: 'John',
			email: 'john@example.com',
			password: 'password',
			createdAt: new Date(),
			isDeleted: false,
			updatedAt: null,
			videos: [],
			comments: [],
		};
		jest.spyOn(userRepository, 'save').mockResolvedValue(user as any);

		const result = await service.createUser(
			'John',
			'john@example.com',
			'password',
		);
		expect(result.status).toBe(true);
		expect(result.data).toEqual(user);
	});

	it('should throw NotFoundException when user not found', async () => {
		jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
		await expect(service.getUser('non-existing-id')).rejects.toThrow(
			NotFoundException,
		);
	});

	it('should return a user', async () => {
		const user = {
			id: '1',
			name: 'John',
			email: 'john@example.com',
			password: 'password',
			createdAt: new Date(),
			isDeleted: false,
			updatedAt: null,
			videos: [],
			comments: [],
		};
		jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as any);

		const result = await service.getUser('1');
		expect(result.status).toBe(true);
		expect(result.data).toEqual(user);
	});

	it('should delete a user', async () => {
		const user = {
			id: '1',
			name: 'John',
			email: 'john@example.com',
			password: 'password',
			createdAt: new Date(),
			isDeleted: false,
			updatedAt: null,
			videos: [],
			comments: [],
		};
		jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as any);
		jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);

		const result = await service.deleteUser('1');
		expect(result.status).toBe(true);
		expect(result.message).toBe('Usuario eliminado correctamente');
	});
});
