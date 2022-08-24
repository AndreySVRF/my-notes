import {Module} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CategoryController} from './category.controller';

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
})
class CategoryModule {}

export {CategoryModule};
