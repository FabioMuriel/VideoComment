import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import { User } from '../Entities/User.Entities';

describe('UserController', () => {
	let controller: UserController;
	let service: UserService;

	const mockUserService = {
		getUsers: jest.fn(),
		getUser: jest.fn(),
		createUser: jest.fn(),
		deleteUser: jest.fn(),
		updateUser: jest.fn(),
		getDeletedUsers: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: mockUserService,
				},
			],
		}).compile();

		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
	});

	describe('getUsers', () => {
		it('should return an array of users', async () => {
			const result = {
				status: true,
				message: 'Usuarios encontrados',
				data: [],
			};
			jest.spyOn(service, 'getUsers').mockResolvedValue(result);

			expect(await controller.getUsers()).toStrictEqual(result);
		});
	});

	describe('getUser', () => {
		it('should return a user', async () => {
			const result = {
				status: true,
				message: 'Usuario encontrado',
				data: {} as User,
			};
			jest.spyOn(service, 'getUser').mockResolvedValue(result);
			const id = 'some-id';

			expect(await controller.getUser(id)).toStrictEqual(result);
		});

		it('should throw BadRequestException if user not found', async () => {
			const result = { status: false, message: 'Usuario no encontrado' };
			jest.spyOn(service, 'getUser').mockResolvedValue(result);
			const id = 'some-id';

			await expect(controller.getUser(id)).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('createUser', () => {
		it('should create a user', async () => {
			const userDto = {
				name: 'John',
				email: 'john@example.com',
				password: 'password',
			};
			const result = {
				status: true,
				message: 'Usuario creado correctamente',
				data: {} as User,
			};
			jest.spyOn(service, 'createUser').mockResolvedValue(result);

			expect(await controller.createUser(userDto)).toStrictEqual(result);
		});

		it('should throw BadRequestException if creation fails', async () => {
			const userDto = {
				name: 'John',
				email: 'john@example.com',
				password: 'password',
			};
			const result = {
				status: false,
				message: 'Error al crear el usuario',
			};
			jest.spyOn(service, 'createUser').mockResolvedValue(result);

			await expect(controller.createUser(userDto)).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('deleteUser', () => {
		it('should delete a user', async () => {
			const id = 'some-id';
			const result = {
				data: undefined,
				status: true,
				message: 'Usuario eliminado correctamente',
			};
			jest.spyOn(service, 'deleteUser').mockResolvedValue(result);

			expect(await controller.deleteUser(id)).toStrictEqual(result);
		});

		it('should throw BadRequestException if deletion fails', async () => {
			const id = 'some-id';
			const result = {
				status: false,
				message: 'Error al eliminar el usuario',
			};
			jest.spyOn(service, 'deleteUser').mockResolvedValue(result);

			await expect(controller.deleteUser(id)).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('updateUser', () => {
		it('should update a user', async () => {
			const id = 'some-id';
			const userDto = {
				name: 'John',
				email: 'john@example.com',
				password: 'newpassword',
			};
			const result = {
				status: true,
				message: 'Usuario actualizado correctamente',
				data: {} as User,
			};
			jest.spyOn(service, 'updateUser').mockResolvedValue(result);

			expect(await controller.updateUser(id, userDto)).toStrictEqual(
				result,
			);
		});

		it('should throw BadRequestException if update fails', async () => {
			const id = 'some-id';
			const userDto = {
				name: 'John',
				email: 'john@example.com',
				password: 'newpassword',
			};
			const result = {
				status: false,
				message: 'Error al actualizar el usuario',
			};
			jest.spyOn(service, 'updateUser').mockResolvedValue(result);

			await expect(controller.updateUser(id, userDto)).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('getDeletedUsers', () => {
		it('should return an array of deleted users', async () => {
			const result = {
				status: true,
				message: 'Usuarios eliminados',
				data: [],
			};
			jest.spyOn(service, 'getDeletedUsers').mockResolvedValue(result);

			expect(await controller.getDeletedUsers()).toStrictEqual(result);
		});
	});
});
