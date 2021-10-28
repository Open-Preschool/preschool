import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true, // subscriptions: {'graphql-ws': true},
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthModule,
    ClassroomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
