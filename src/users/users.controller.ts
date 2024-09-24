import { Controller, Get, Post, Put, Body, Delete, Param} from '@nestjs/common';
import { UserService } from './users.service';
import { UserCreateDto } from '../dtos/userCreate.dto';
import { UserUpdateDto } from '../dtos/userUpdate.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	async getUsers(@Param('id') id: string) {
		return this.userService.getUser(id);
	}

	@Post()
	async createUser(@Body() user: UserCreateDto) {
		return this.userService.createUser(
			user.name,
			user.email,
			user.password,
		);
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: string) {
		return this.userService.deleteUser(id);
	}

	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() user: UserUpdateDto) {
		return this.userService.updateUser(id, user);
	}
}
