import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entitys/user.entity';
import { Tag } from './Entitys/tag.entity';
import { Blog } from './Entitys/blog.entity';
const Entity = TypeOrmModule.forFeature([User, Tag, Blog]);

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'xiaoxiwen',
      database: 'cain-test',
      entities: [User, Tag, Blog],
      synchronize: true,
    }),
    Entity,
  ],
  providers: [DbService],
  exports: [DbService, Entity],
})
export class DbModule {}
