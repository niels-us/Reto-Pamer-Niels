import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { truncate } from 'fs';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, PaginationQueryDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getAll(): Promise<User[]> {
    return await this.repository.find({ isDeleted: false });
  }

  public async getUser(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;

    return await this.repository.save(user);
  }

  public async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    const userUpdate = await this.repository.findOne(id);
    const user = Object.assign(userUpdate, UpdateUserDto);
    user.name = body.name;
    user.email = body.email;

    return await this.repository.save(user);
  }

  public async deleteLogicoUser(id: number) {
    const postExist = await this.repository.findOne(id, { where: { isDeleted: false } });
    if (!postExist) {
      return { message: `ya esta eliminado el id: ${id}` };
    } else {
      await this.repository.update(id, { isDeleted: true });
      return { message: `Se elimino logicamente el id : ${id}` };
    }
  }

  public async deleteUser(id: number) {
    const userDelete = await this.repository.delete(id);
    const Message = userDelete.affected == 1 ? `Se elimino el id: ${id}` : `No existe el id: ${id}`;
    return { Message };
  }

  public async getPage({ limit, offset }: PaginationQueryDto): Promise<User[]> {
    return await this.repository.find({
      skip: offset,
      take: limit
    });
  }

  
}
