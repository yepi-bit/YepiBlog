import { getManager } from 'typeorm';

const find = async (obj: any) => {
        
  const data = await getManager().createQueryBuilder(obj,'obj').getMany();
  return data;
};

export {
    find
}