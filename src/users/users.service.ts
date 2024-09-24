import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entities/User.Entities';
import { v4 } from 'uuid';
import { UserUpdateDto } from '../dtos/userUpdate.dto';
import { Video } from '../Entities/Video.Entities';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
	) {}

	async getUser(id: string): Promise<User[]> {
		return await this.userRepository.find({ where: { id: id } });
	}

	async createUser(name: string,email: string,password: string): Promise<User> {
		const newUser = {
			id: v4(),
			name: name,
			email: email,
			password: password,
			createdAt: new Date(),
			isDeleted: false,
		};

		return await this.userRepository.save(newUser);
	}

	async deleteUser(id: string): Promise<void> {
		await this.userRepository.delete(id);
	}

	async updateUser(id: string, user: UserUpdateDto): Promise<User> {
		await this.userRepository.update(id, user);

		return await this.userRepository.findOne({ where: { id: id } });
    }
    
    async getUserVideos(id: string): Promise<Video[]> {
        return await this.videoRepository.find({ where: { user: { id: id } } });
    }
}
