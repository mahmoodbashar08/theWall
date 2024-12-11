import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Import User entity
import { Post } from '../posts/post.entity'; // Import Post entity if needed
import { Like } from 'src/likes/like.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Like]), PostsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export UserService so it can be used in other modules
})
export class UserModule {}
