import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import {BadRequestResponseDto, ForbiddenResponseDto} from '../dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import {CategoryService} from './category.service';
import {
	CategoryCreateRequestPostDto,
	CategoryCreateResponsePostDto,
	CategoryRemoveResponseDeleteDto,
	CategoryResponseGetDto,
	CategoryUpdateRequestPutDto,
	CategoryUpdateResponsePutDto,
} from './dto';
import {GetUser} from '../auth/decorator';
import {JwtGuard} from '../auth/guard';

@ApiTags('Category')
@UseGuards(JwtGuard)
@Controller('api/category')
class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@ApiOperation({summary: 'Create category'})
	@ApiResponse({
		status: 201,
		description: 'Created',
		type: CategoryCreateResponsePostDto,
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		type: BadRequestResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden',
		type: ForbiddenResponseDto,
	})
	@ApiBody({type: CategoryCreateRequestPostDto})
	@Post()
	create(
		@Body() dto: CategoryCreateRequestPostDto,
		@GetUser('id') userId: number
	): Promise<CategoryCreateResponsePostDto> {
		return this.categoryService.create(dto, userId);
	}

	@ApiOperation({summary: 'Get all categories for user'})
	@ApiResponse({
		status: 200,
		description: 'OK',
		type: CategoryResponseGetDto,
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		type: BadRequestResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden',
		type: ForbiddenResponseDto,
	})
	@Get()
	getAll(@GetUser('id') userId: number): Promise<CategoryResponseGetDto[]> {
		return this.categoryService.getAll(userId);
	}

	@ApiOperation({summary: 'Get category by id'})
	@ApiResponse({
		status: 200,
		description: 'OK',
		type: CategoryResponseGetDto,
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		type: BadRequestResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden',
		type: ForbiddenResponseDto,
	})
	@ApiParam({name: 'id', description: 'Category id'})
	@Get(':id')
	getById(
		@Param('id') id: number,
		@GetUser('id') userId: number
	): Promise<CategoryResponseGetDto> {
		return this.categoryService.getById(id, userId);
	}

	@ApiOperation({summary: 'Update category by id'})
	@ApiResponse({
		status: 200,
		description: 'OK',
		type: CategoryUpdateResponsePutDto,
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		type: BadRequestResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden',
		type: ForbiddenResponseDto,
	})
	@ApiBody({type: CategoryUpdateRequestPutDto})
	@Put()
	update(
		@Body() dto: CategoryUpdateRequestPutDto,
		@GetUser('id') userId: number
	): Promise<CategoryUpdateResponsePutDto> {
		return this.categoryService.update(dto, userId);
	}

	@ApiOperation({summary: 'Remove category by id'})
	@ApiResponse({
		status: 200,
		description: 'OK',
		type: CategoryRemoveResponseDeleteDto,
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		type: BadRequestResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden',
		type: ForbiddenResponseDto,
	})
	@ApiParam({name: 'id', description: 'Category id'})
	@Delete(':id')
	remove(
		@Param('id') id: number,
		@GetUser('id') userId: number
	): Promise<CategoryUpdateResponsePutDto> {
		return this.categoryService.remove(id, userId);
	}
}

export {CategoryController};
