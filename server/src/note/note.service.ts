import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma';
import {Note} from '@prisma/client';
import {NoteCreateRequestPostDto, NoteUpdateRequestPutDto} from './dto';
import {CategoryService} from '../category/category.service';

const NOTE_NOT_FOUND = 'Note with given id is not found';
const CATEGORY_NOT_FOUND = 'The user does not have a category with this id';

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

	async getAllFromCategory(
		categoryId: number,
		userId: number
	): Promise<Note[]> {
		try {
			const isCategoryExistsAtUser = await this.categoryService.getById(
				categoryId,
				userId
			);

			if (isCategoryExistsAtUser) {
				const notes = await this.prisma.note.findMany({
					where: {
						categoryId: Number(categoryId),
					},
				});

				return notes;
			}
		} catch (error) {
			throw error;
		}
	}

	async getById(id: number, userId: number): Promise<Note> {
		try {
			const note = await this.prisma.note.findUnique({
				where: {
					id: Number(id),
				},
			});

			if (note) {
				await this.categoryService.getById(note.categoryId, userId);

				return note;
			} else {
				throw new NotFoundException(NOTE_NOT_FOUND);
			}
		} catch (error) {
			throw error;
		}
	}

	async update(dto: NoteUpdateRequestPutDto, userId: number): Promise<Note> {
		await this.checkingAccessSelectedNote(dto.id, userId);

		try {
			const updatedNote = await this.prisma.note.update({
				where: {
					id: Number(dto.id),
				},
				data: {
					title: dto.title,
					description: dto.description,
					categoryId: dto.categoryId,
				},
			});

			return updatedNote;
		} catch {
			throw new NotFoundException(CATEGORY_NOT_FOUND);
		}
	}

	async remove(id: number, userId: number): Promise<Note> {
		await this.checkingAccessSelectedNote(id, userId);

		const removedNote = await this.prisma.note.delete({
			where: {
				id: Number(id),
			},
		});

		return removedNote;
	}

	private async checkingAccessSelectedNote(id, userId): Promise<void> {
		try {
			const note = await this.prisma.note.findUnique({
				where: {
					id: Number(id),
				},
			});

			if (note) {
				await this.categoryService.getById(note.categoryId, userId);
			} else {
				throw new NotFoundException(NOTE_NOT_FOUND);
			}
		} catch (error) {
			throw error;
		}
	}
}

export {NoteService};
