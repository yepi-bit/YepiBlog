import { Injectable } from '@nestjs/common';
import { Tag } from 'libs/db/Entitys/tag.entity';
import { ApiresultService } from 'src/apiresult/apiresult.service';
import { getManager } from 'typeorm';
import { Crud } from '../Utils/Crud.Utils';
interface Paging {
  search: any;
  limit: string;
  page: string;
}

@Injectable()
export class TagsService {
  CrudModel = new Crud(Tag);
  async findAll(query: Paging) {
    return await this.CrudModel.FindAll(query, 'entity.superiors');
  }
  async create(body: Tag) {
    return await this.CrudModel.create(body);
  }
  async update(body: Tag) {
    return await this.CrudModel.update(body);
  }
  async delete(id) {
    await getManager()
      .createQueryBuilder()
      .update(Tag)
      .set({ superiorsid: null })
      .where('superiorsid=:id', { id: id })
      .execute();
    return await this.CrudModel.delete(id);
  }
}
