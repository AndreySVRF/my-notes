import {Module} from '@nestjs/common';
import {NoteService} from './note.service';
import {NoteController} from './note.controller';
import {CategoryService} from '../category/category.service';

@Module({
	controllers: [NoteController],
	providers: [NoteService, CategoryService],
})
class NoteModule {}

export {NoteModule};
