import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepositoryService } from './user-repository/user-repository.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepositoryService],
})
export class UsersModule {}
