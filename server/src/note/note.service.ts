import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma';
import {Note} from '@prisma/client';
import {NoteCreateRequestPostDto} from './dto';
import {CategoryService} from '../category/category.service';

@Injectable()
class NoteService {
	constructor(
		private prisma: PrismaService,
		private categoryService: CategoryService
	) {}

	async create(dto: NoteCreateRequestPostDto, userId: number): Promise<Note> {
		try {
			const isCategoryExistsAtUser = await this.categoryService.getById(
				dto.categoryId,
				userId
			);

			if (isCategoryExistsAtUser) {
				const note = await this.prisma.note.create({
					data: {
						title: dto.title,
						description: dto.description,
						categoryId: dto.categoryId,
					},
				});

				return note;
			}
		} catch (error) {
			throw error;
		}
	}
}

export {NoteService};
