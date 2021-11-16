import { Module, UnauthorizedException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ClassroomModule } from './classroom/classroom.module';
import * as jwt from 'jsonwebtoken';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true, // subscriptions: {'graphql-ws': true},
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            const authToken = connectionParams?.headers?.authorization;
            if (!authToken) {
              throw new UnauthorizedException();
            }
            const [, token] = authToken.split(' ');
            const user = jwt.verify(token, process.env.SUPABASE_JWT_SIGNATURE);
            if (!user) {
              throw new UnauthorizedException();
            }
            return { user };
          },
        },
      },
      // context: ({ connection }) => {
      context: (connection) => {
        // connection.context SHOULD be equal to what was returned by the "onConnect" callback
        if (connection) {
          console.log('connection', connection);
        }
      },
    }),
    AuthModule,
    ClassroomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
