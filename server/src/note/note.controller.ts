import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {NoteService} from './note.service';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {BadRequestResponseDto, ForbiddenResponseDto} from '../dto';
import {JwtGuard} from '../auth/guard';
import {NoteCreateRequestPostDto, NoteCreateResponsePostDto} from './dto';
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
}

export {NoteController};
