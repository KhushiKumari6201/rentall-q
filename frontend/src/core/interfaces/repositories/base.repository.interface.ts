export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(skip?: number, limit?: number): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
