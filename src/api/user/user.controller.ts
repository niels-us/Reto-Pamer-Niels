import { Delete, Logger } from '@nestjs/common';
import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, PaginationQueryDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  public getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }

  @Put(':id')
  public async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<User> {
    return await this.service.updateUser(id, body);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: number) {
    return await this.service.deleteUser(id);
  }

  @Delete('logico/:id')
  public async deleteLogicoUser(@Param('id') id: number) {
    return await this.service.deleteLogicoUser(id);
  }

  @Get('pages/page')
  public getPage(@Body() pagination: PaginationQueryDto): Promise<User[]> {
    return this.service.getPage(pagination);
  }  
}
