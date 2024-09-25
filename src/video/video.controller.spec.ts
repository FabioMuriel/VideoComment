import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { BadRequestException } from '@nestjs/common';
import { GenericResponse } from '../dto/GenericResponse.dto';
import { Video } from '../Entities/Video.Entities';

describe('VideoController', () => {
	let controller: VideoController;
	let service: VideoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [VideoController],
			providers: [
				{
					provide: VideoService,
					useValue: {
						getVideos: jest.fn(),
						getDeletedVideos: jest.fn(),
						getVideo: jest.fn(),
						createVideo: jest.fn(),
						deleteVideo: jest.fn(),
						updateVideo: jest.fn(),
						getUserVideos: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<VideoController>(VideoController);
		service = module.get<VideoService>(VideoService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('getVideos', () => {
		it('should return a list of videos when successful', async () => {
			const mockResult = {
				status: true,
				message: 'Videos encontrados',
				data: [],
			};
			jest.spyOn(service, 'getVideos').mockResolvedValue(mockResult);

			const result = await controller.getVideos();
			expect(result).toEqual(mockResult);
		});

		it('should throw a BadRequestException when unsuccessful', async () => {
			const mockResult = {
				status: false,
				message: 'Error al obtener videos',
			};
			jest.spyOn(service, 'getVideos').mockResolvedValue(mockResult);

			await expect(controller.getVideos()).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('getDeletedVideos', () => {
		it('should return a list of deleted videos when successful', async () => {
			const mockResult = {
				status: true,
				message: 'Videos eliminados encontrados',
				data: [],
			};
			jest.spyOn(service, 'getDeletedVideos').mockResolvedValue(
				mockResult,
			);

			const result = await controller.getDeletedVideos();
			expect(result).toEqual(mockResult);
		});

		it('should throw a BadRequestException when unsuccessful', async () => {
			const mockResult = {
				status: false,
				message: 'Error al obtener videos eliminados',
			};
			jest.spyOn(service, 'getDeletedVideos').mockResolvedValue(
				mockResult,
			);

			await expect(controller.getDeletedVideos()).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('getVideo', () => {
		it('should return a video when found', async () => {
			const mockResult = {
				status: true,
				message: 'Video encontrado',
				data: { id: '1', title: 'Video' },
			};
			jest.spyOn(service, 'getVideo').mockResolvedValue(
				mockResult as GenericResponse<Video>,
			);

			const result = await controller.getVideo('1');
			expect(result).toEqual(mockResult);
		});

		it('should throw a BadRequestException when video is not found', async () => {
			const mockResult = {
				status: false,
				message: 'Video no encontrado',
			};
			jest.spyOn(service, 'getVideo').mockResolvedValue(mockResult);

			await expect(controller.getVideo('1')).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('createVideo', () => {
		it('should create a video successfully', async () => {
			const mockCreateDto = {
				title: 'New Video',
				description: 'A new video',
				userId: '123',
			};
			const mockResult = {
				status: true,
				message: 'Video creado correctamente',
				data: { id: '1', ...mockCreateDto },
			};
			jest.spyOn(service, 'createVideo').mockResolvedValue(
				mockResult as unknown as GenericResponse<Video>,
			);

			const result = await controller.createVideo(mockCreateDto);
			expect(result).toEqual(mockResult);
		});

		it('should throw a BadRequestException when creation fails', async () => {
			const mockCreateDto = {
				title: 'New Video',
				description: 'A new video',
				userId: '123',
			};
			const mockResult = {
				status: false,
				message: 'Error al crear el video',
			};
			jest.spyOn(service, 'createVideo').mockResolvedValue(mockResult);

			await expect(controller.createVideo(mockCreateDto)).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('deleteVideo', () => {
		it('should delete a video successfully', async () => {
			const mockResult = {
				status: true,
				message: 'Video eliminado correctamente',
			};
			jest.spyOn(service, 'deleteVideo').mockResolvedValue(mockResult);

			const result = await controller.deleteVideo('1');
			expect(result).toEqual(mockResult);
		});

		it('should throw a BadRequestException when deletion fails', async () => {
			const mockResult = {
				status: false,
				message: 'Error al eliminar el video',
			};
			jest.spyOn(service, 'deleteVideo').mockResolvedValue(mockResult);

			await expect(controller.deleteVideo('1')).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('updateVideo', () => {
		it('should update a video successfully', async () => {
			const mockUpdateDto = {
				title: 'Updated Video',
				description: 'Updated description',
			};
			const mockResult = {
				status: true,
				message: 'Video actualizado correctamente',
				data: { id: '1', ...mockUpdateDto },
			};
			jest.spyOn(service, 'updateVideo').mockResolvedValue(
				mockResult as GenericResponse<Video>,
			);

			const result = await controller.updateVideo('1', mockUpdateDto);
			expect(result).toEqual(mockResult);
		});

		it('should throw a BadRequestException when update fails', async () => {
			const mockUpdateDto = {
				title: 'Updated Video',
				description: 'Updated description',
			};
			const mockResult = {
				status: false,
				message: 'Error al actualizar el video',
			};
			jest.spyOn(service, 'updateVideo').mockResolvedValue(mockResult);

			await expect(
				controller.updateVideo('1', mockUpdateDto),
			).rejects.toThrow(BadRequestException);
		});
	});

	describe('getUserVideos', () => {
		it('should return videos of a user successfully', async () => {
			const mockResult = {
				status: true,
				message: 'Videos de usuario encontrados',
				data: [],
			};
			jest.spyOn(service, 'getUserVideos').mockResolvedValue(mockResult);

			const result = await controller.getUserVideos('123');
			expect(result).toEqual(mockResult);
		});

		it('should throw a BadRequestException when it fails', async () => {
			const mockResult = {
				status: false,
				message: 'Error al obtener videos del usuario',
			};
			jest.spyOn(service, 'getUserVideos').mockResolvedValue(mockResult);

			await expect(controller.getUserVideos('123')).rejects.toThrow(
				BadRequestException,
			);
		});
	});
});
