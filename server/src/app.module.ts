import { Module } from '@nestjs/common';
import { DbModule } from 'libs/db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiresultModule } from './apiresult/apiresult.module';
import { TagsModule } from './tags/tags.module';
import { BlogsModule } from './blogs/blogs.module';
import { MulterModule } from '@nestjs/platform-express';
const MAO = require('multer-aliyun-oss');
@Module({
  imports: [
    DbModule,
    ApiresultModule,
    TagsModule,
    BlogsModule,
    MulterModule.register({
      storage: MAO({
        config: {
          
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
