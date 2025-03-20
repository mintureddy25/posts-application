import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Post } from './posts/post.entity';
import { AuthModule } from './auth/auth.module';
 // Import your Post entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'saiteja-saitejareddymintu4444-687b.l.aivencloud.com',  // MySQL server address (could be an IP or domain name)
      port: 20339,         // Default MySQL port
      username: 'avnadmin', // Your MySQL username
      password: 'AVNS_qaD5GojkiWbjQcPkpfi', // Your MySQL password
      database: 'blogs',   // The name of your database
      entities: [Post],  
      synchronize: true,  
    }),
    PostsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
