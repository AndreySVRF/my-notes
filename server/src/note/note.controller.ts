import {Controller} from '@nestjs/common';
import {NoteService} from './note.service';

@Controller('note')
class NoteController {
	constructor(private noteService: NoteService) {}
}

export {NoteController};
