import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
	private readonly API_KEY = 'b99445ee1e5a422bbab5be2a3369336a';

	use(req: Request, res: Response, next: NextFunction) {
		const apiKey = req.headers['x-api-key'];

		if (apiKey === this.API_KEY) {
			next();
		} else {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}
	}
}
