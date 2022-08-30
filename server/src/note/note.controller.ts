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
import {NoteService} from './note.service';
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import {BadRequestResponseDto, ForbiddenResponseDto} from '../dto';
import {JwtGuard} from '../auth/guard';
import {
	NoteCreateRequestPostDto,
	NoteCreateResponsePostDto,
	NoteRemoveResponseDeleteDto,
	NoteResponseGetDto,
	NoteUpdateRequestPutDto,
	NoteUpdateResponsePutDto,
} from './dto';
import {GetUser} from '../auth/decorator';

@ApiTags('Note')
@UseGuards(JwtGuard)
@Controller('api/note')
class NoteController {
	constructor(private noteService: NoteService) {}

	@ApiOperation({summary: 'Create note'})
	@ApiResponse({
		status: 201,
		description: 'Created',
		type: NoteCreateResponsePostDto,
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
	@ApiBody({type: NoteCreateRequestPostDto})
	@Post()
	create(
		@Body() dto: NoteCreateRequestPostDto,
		@GetUser('id') userId: number
	): Promise<NoteCreateResponsePostDto> {
		return this.noteService.create(dto, userId);
	}

	@ApiOperation({summary: 'Get all notes for category'})
	@ApiResponse({
		status: 200,
		description: 'OK',
		type: NoteResponseGetDto,
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
	@ApiParam({name: 'categoryId', description: 'Category id'})
	@Get('/all/:categoryId')
	getAllFromCategory(
		@Param('categoryId') categoryId: number,
		@GetUser('id') userId: number
	): Promise<NoteResponseGetDto[]> {
		return this.noteService.getAllFromCategory(categoryId, userId);
	}

	@ApiOperation({summary: 'Get note by id'})
	@ApiResponse({
		status: 200,
		description: 'OK',
		type: NoteResponseGetDto,
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
	@ApiParam({name: 'id', description: 'Note id'})
	@Get(':id')
	getById(
		@Param('id') id: number,
		@GetUser('id') userId: number
	): Promise<NoteResponseGetDto> {
		return this.noteService.getById(id, userId);
	}

	@ApiOperation({summary: 'Update note'})
	@ApiResponse({
		status: 200,
		description: 'OK',
		type: NoteUpdateResponsePutDto,
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
	@ApiBody({type: NoteUpdateRequestPutDto})
	@Put()
	update(
		@Body() dto: NoteUpdateRequestPutDto,
		@GetUser('id') userId: number
	): Promise<NoteUpdateResponsePutDto> {
		return this.noteService.update(dto, userId);
	}

	@ApiOperation({summary: 'Remove note by id'})
	@ApiResponse({
		status: 200,
		description: 'OK',
		type: NoteRemoveResponseDeleteDto,
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
	@ApiParam({name: 'id', description: 'Note id'})
	@Delete(':id')
	remove(
		@Param('id') id: number,
		@GetUser('id') userId: number
	): Promise<NoteRemoveResponseDeleteDto> {
		return this.noteService.remove(id, userId);
	}
}

export {NoteController};
