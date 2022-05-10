import { ApiresultService } from 'src/apiresult/apiresult.service';
import { getManager } from 'typeorm';

interface Paging {
  search: any;
  limit: string;
  page: string;
}

export class Crud {
  constructor(private readonly Entity) {}
  Apiresult = new ApiresultService();
  FindAll = async (query: Paging, join?: string) => {
    const search = query.search || '{}';
    const limit = Number(query.limit) || 10;
    const page = (Number(query.page) - 1) * limit || 0;
    const data = await getManager()
      .createQueryBuilder(this.Entity, 'entity')
      .leftJoinAndSelect(join, 'children')
      .where(JSON.parse(search))
      .skip(page)
      .take(limit)
      .getMany();
    const totals = await getManager()
      .createQueryBuilder(this.Entity, 'entity')
      .where(JSON.parse(search))
      .getCount();

    const lastpage = Math.ceil(totals / limit);
    return {
      totol: totals,
      data: data,
      lastpage: lastpage,
      page: page + 1,
    };
  };

  create = async (body: any) => {
    const data = await getManager()
      .createQueryBuilder()
      .insert()
      .into(this.Entity)
      .values(body)
      .execute();
    if (data.raw.affectedRows > 0) {
      return this.Apiresult.message(200, '插入成功');
    } else {
      return this.Apiresult.message(500, '插入失败请检查参数');
    }
  };

  update = async (body: any) => {
    const data = await getManager()
      .createQueryBuilder()
      .update(this.Entity)
      .set(body)
      .where('id=:id', { id: body.id })
      .execute();
    if (data.raw.affectedRows > 0) {
      return this.Apiresult.message(200, '修改成功');
    } else {
      return this.Apiresult.message(500, '修改失败请检查参数');
    }
  };

  delete = async (id: string) => {
    const data = await getManager()
      .createQueryBuilder()
      .delete()
      .from(this.Entity)
      .where('id=:id', { id })
      .execute();
    if (data.raw.affectedRows > 0) {
      return this.Apiresult.message(200, '删除成功');
    } else {
      return this.Apiresult.message(500, '删除失败请检查参数');
    }
  };
}
