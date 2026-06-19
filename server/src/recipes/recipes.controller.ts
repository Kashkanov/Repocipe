import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number = 8,
    @Query('search') search?: string,
  ) {
    return this.recipesService.findAll(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recipesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRecipeDto) {
    return this.recipesService.create(dto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/recipes',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    const serverUrl = process.env.SERVER_URL;
    console.log('SERVER_URL:', serverUrl);
    console.log('FILE:', file);
    return { url: `${serverUrl}/uploads/recipes/${file.filename}` };
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRecipeDto) {
    console.log('CONTROLLER RECEIVED:', dto);
    return this.recipesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recipesService.remove(id);
  }
}
