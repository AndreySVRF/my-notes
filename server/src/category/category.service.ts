import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma';
import {Category} from '@prisma/client';
import {CategoryCreateRequestPostDto} from './dto';

const CATEGORY_NOT_FOUND = 'Category with given id is not found';

@Injectable()
class CategoryService {
	constructor(private prisma: PrismaService) {}

	async create(
		dto: CategoryCreateRequestPostDto,
		userId: number
	): Promise<Category> {
		try {
			const category = await this.prisma.category.create({
				data: {
					title: dto.title,
					iconColor: dto.iconColor,
					userId,
				},
			});

			return category;
		} catch (error) {
			throw error;
		}
	}

	async getAll(userId: number): Promise<Category[]> {
		try {
			const categories = await this.prisma.category.findMany({
				where: {
					userId,
				},
			});

			return categories;
		} catch (error) {
			throw error;
		}
	}

	async getById(id: number, userId: number): Promise<Category> {
		try {
			const category = await this.prisma.category.findUnique({
				where: {
					id: Number(id),
				},
			});

			if (!category || category.userId !== userId) {
				throw new NotFoundException(CATEGORY_NOT_FOUND);
			}

			return category;
		} catch (error) {
			throw error;
		}
	}
}

export {CategoryService};
