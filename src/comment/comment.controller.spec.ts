import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './index';
import { GenericResponse } from '../dtos/GenericResponse.dto';
import { BadRequestException } from '@nestjs/common';
import { Comment } from '../entities/Comment.Entities';

describe('CommentController', () => {
	let controller: CommentController;
	let commentService: CommentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CommentController],
			providers: [
				{
					provide: CommentService,
					useValue: {
						getComments: jest.fn(),
						getComment: jest.fn(),
						createComment: jest.fn(),
						updateComment: jest.fn(),
						deleteComment: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<CommentController>(CommentController);
		commentService = module.get<CommentService>(CommentService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should get comments', async () => {
		const result = {
			status: true,
			message: 'Comentarios encontrados',
			data: [],
		};
		jest.spyOn(commentService, 'getComments').mockResolvedValue(result);

		expect(await controller.getComments()).toEqual(result);
	});

	it('should throw BadRequestException when getComment fails', async () => {
    const result = {
      status: false,
      message: 'Comentario no encontrado'
    };

    jest.spyOn(commentService, 'getComment').mockResolvedValue(result);

		await expect(controller.getComment('non-existing-id')).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should return a comment', async () => {
		const result = {
			status: true,
			message: 'Comentario encontrado',
			data: {},
		};
		jest.spyOn(commentService, 'getComment').mockResolvedValue(result as GenericResponse<Comment>);

		expect(await controller.getComment('1')).toEqual(result);
	});

	it('should create a comment', async () => {
		const commentDto = {
			content: 'Great video!',
			videoId: '1',
			userId: '1',
		};
		const result = { status: true, message: 'Comentario creado', data: {} };
		jest.spyOn(commentService, 'createComment').mockResolvedValue(result as GenericResponse<Comment>);

		expect(await controller.createComment(commentDto)).toEqual(result);
	});

	it('should throw BadRequestException when createComment fails', async () => {
		const commentDto = {
			content: 'Great video!',
			videoId: '1',
			userId: '1',
		};
		const result = { status: false, message: 'Error al crear comentario' };
		jest.spyOn(commentService, 'createComment').mockResolvedValue(result);

		await expect(controller.createComment(commentDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should update a comment', async () => {
		const result = {
			status: true,
			message: 'Comentario actualizado',
			data: {},
		};
		jest.spyOn(commentService, 'updateComment').mockResolvedValue(result as GenericResponse<Comment>);

		expect(
			await controller.updateComment('1', { content: 'Updated comment' }),
		).toEqual(result);
	});

	it('should delete a comment', async () => {
		const result = { status: true, message: 'Comentario eliminado' };
		jest.spyOn(commentService, 'deleteComment').mockResolvedValue(result);

		expect(await controller.deleteComment('1')).toEqual(result);
	});
});
