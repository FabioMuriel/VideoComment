import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entities/User.Entities';
import { v4 } from 'uuid';
import { GenericResponse } from '../Dtos/GenericResponse.Dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	private async findUserById(id: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundException('Usuario no encontrado');
		}
		return user;
	}

	async getUsers(): Promise<GenericResponse<User[]>> {
		const users = await this.userRepository.find({
			where: { isDeleted: false },
		});
		const message =
			users.length === 0 ? 'No hay usuarios' : 'Usuarios encontrados';

		return GenericResponse.create<User[]>({
			status: true,
			message,
			data: users,
		});
	}

	async getDeletedUsers(): Promise<GenericResponse<User[]>> {
		const users = await this.userRepository.find({
			where: { isDeleted: true },
		});
		const message =
			users.length === 0
				? 'No hay usuarios eliminados'
				: 'Usuarios eliminados';

		return GenericResponse.create<User[]>({
			status: true,
			message,
			data: users,
		});
	}

	async getUser(id: string): Promise<GenericResponse<User>> {
		const user = await this.findUserById(id);
		return GenericResponse.create<User>({
			status: true,
			message: 'Usuario encontrado',
			data: user,
		});
	}

	async createUser(
		name: string,
		email: string,
		password: string,
	): Promise<GenericResponse<User>> {
		const newUser: User = {
			id: v4(),
			name,
			email,
			password,
			createdAt: new Date(),
			isDeleted: false,
			updatedAt: null,
			videos: [],
			comments: [],
		};

		try {
			const user = await this.userRepository.save(newUser);
			return GenericResponse.create<User>({
				status: true,
				message: 'Usuario creado correctamente',
				data: user,
			});
		} catch (error) {
			return GenericResponse.create<User>({
				status: false,
				message: 'Error al crear el usuario',
				errors: [error.message],
			});
		}
	}

	async deleteUser(id: string): Promise<GenericResponse<void>> {
		try {
			await this.findUserById(id);

			await this.userRepository.update(id, { isDeleted: true });
			return GenericResponse.create<void>({
				status: true,
				message: 'Usuario eliminado correctamente',
			});
		} catch (error) {
			return GenericResponse.create<void>({
				status: false,
				message: 'Error al eliminar el usuario',
				errors: [error.message],
			});
		}
	}

	async updateUser(
		id: string,
		name: string,
		email: string,
		password: string,
	): Promise<GenericResponse<User>> {
		try {
			const user = await this.findUserById(id);
			if (!user) {
				return GenericResponse.create<User>({
					status: false,
					message: 'Usuario no encontrado',
				});
			}

			await this.userRepository.update(id, {
				name,
				email,
				password,
				updatedAt: new Date(),
			});
			const updatedUser = await this.userRepository.findOne({
				where: { id },
			});

			return GenericResponse.create<User>({
				status: true,
				message: 'Usuario actualizado correctamente',
				data: updatedUser,
			});
		} catch (error) {
			return GenericResponse.create<User>({
				status: false,
				message: 'Error al actualizar el usuario',
				errors: [error.message],
			});
		}
	}
}
