import { Injectable } from '@nestjs/common';
import { Blog } from 'libs/db/Entitys/blog.entity';
import { Crud } from 'src/Utils/Crud.Utils';
import { getManager } from 'typeorm';

interface Paging {
  search: any;
  limit: string;
  page: string;
}

@Injectable()
export class BlogsService {
  CrudModel = new Crud(Blog);
  async findAll(query: Paging) {
    return await this.CrudModel.FindAll(query, 'entity.tag');
  }
  async create(body: Blog) {
    return await this.CrudModel.create(body);
  }
  async update(body: Blog) {
    return await this.CrudModel.update(body);
  }
  async delete(id) {
    return await this.CrudModel.delete(id);
  }

  async xll(query: any) {
    // const ll = 'entity.title LIKE :title';
    const ll = {
      title: '测试博客',
    };
    const kk = {
      title: '%测试%',
    };
    const data = await getManager()
      .createQueryBuilder(Blog, 'entity')
      .leftJoinAndSelect('entity.tag', 'children')
      .where(ll)
      .setParameters(kk)
      .getMany();
    return data;
  }
}
