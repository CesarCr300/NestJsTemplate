import {
  DataSource,
  DeleteResult,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';

import { IRepository } from '../interfaces/repository.interface';
import { EntityBase } from './entity.base';

export class RepositoryBase<
  T extends EntityTarget<ObjectLiteral & EntityBase>,
  TResponse extends ObjectLiteral & EntityBase,
  TFilterDto,
  TCreateDto,
  TUpdateDto,
> implements IRepository<TResponse, TFilterDto, TCreateDto, TUpdateDto>
{
  private entityManager: EntityManager;
  private repository: Repository<ObjectLiteral>;

  constructor(
    private dataSource: DataSource,
    entity: T,
  ) {
    this.entityManager = this.dataSource.createEntityManager();
    this.repository = this.entityManager.getRepository(entity);
  }
  async create(createDto: TCreateDto): Promise<TResponse> {
    const createdEntity = this.repository.create(createDto);
    await this.repository.save(createdEntity);
    return createdEntity as TResponse;
  }
  async findAll(
    filter?: TFilterDto,
    options: FindManyOptions<ObjectLiteral> = {},
  ): Promise<TResponse[]> {
    const result = await this.repository.find({ where: filter, ...options });
    return result as TResponse[];
  }
  async findOne(
    filter: TFilterDto,
    options: FindOneOptions<ObjectLiteral> = {},
  ): Promise<TResponse> {
    const response = await this.repository.findOne({
      where: filter,
      ...options,
    });
    return response as TResponse;
  }
  async update(id: number, updateDto: TUpdateDto): Promise<UpdateResult> {
    return await this.repository.update({ id }, updateDto);
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
  async logicRemove(id: number): Promise<UpdateResult> {
    return await this.repository.update({ id }, { state: 0 });
  }
}
