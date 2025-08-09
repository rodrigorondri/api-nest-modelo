import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([User]),
forwardRef(() => AuthModule), ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService,SequelizeModule],
})
export class UsersModule {}