import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly BlogsService: BlogsService) {}
  @Get()
  async findAll(@Query() query) {
    return await this.BlogsService.findAll(query);
  }

  @Post()
  async create(@Body() body) {
    return await this.BlogsService.create(body);
  }

  @Post('/update')
  async update(@Body() body) {
    return await this.BlogsService.update(body);
  }

  @Post('/delete/:id')
  async delete(@Param('id') id) {
    return await this.BlogsService.delete(id);
  }

  @Get('xll')
  async xll(@Query() query) {
    return await this.BlogsService.xll(query);
  }
 
}
