import {
	Controller,
	Get,
	Post,
	Put,
	Body,
	Delete,
	Param,
	BadRequestException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserCreateDto } from '../dto/UserCreate.dto';
import { UserUpdateDto } from '../dto/UserUpdate.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getUsers() {
		const result = await this.userService.getUsers();
		if (!result.status) {
			throw new BadRequestException(result.message);
		}
		return {
			status: result.status,
			message: result.message,
			data: result.data,
		};
	}

	@Get('deleted')
	async getDeletedUsers() {
		const result = await this.userService.getDeletedUsers();
		if (!result.status) {
			throw new BadRequestException(result.message);
		}
		return {
			status: result.status,
			message: result.message,
			data: result.data,
		};
	}

	@Get(':id')
	async getUser(@Param('id') id: string) {
		const result = await this.userService.getUser(id);
		if (!result.status) {
			throw new BadRequestException(result.message);
		}
		return {
			status: result.status,
			message: result.message,
			data: result.data,
		};
	}

	@Post()
	async createUser(@Body() user: UserCreateDto) {
		const result = await this.userService.createUser(
			user.name,
			user.email,
			user.password,
		);
		if (!result.status) {
			throw new BadRequestException(result.message);
		}
		return {
			status: result.status,
			message: result.message,
			data: result.data,
		};
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: string) {
		const result = await this.userService.deleteUser(id);
		if (!result.status) {
			throw new BadRequestException(result.message);
		}
		return {
			status: result.status,
			message: result.message,
			data: result.data,
		};
	}

	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() user: UserUpdateDto) {
		const result = await this.userService.updateUser(
			id,
			user.name,
			user.email,
			user.password,
		);
		if (!result.status) {
			throw new BadRequestException(result.message);
		}
		return {
			status: result.status,
			message: result.message,
			data: result.data,
		};
	}
}
