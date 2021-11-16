import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('supabase') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req, connection } = ctx.getContext();

    // if subscriptions/webSockets, let it pass headers from connection.context to passport-jwt
    return connection && connection.context && connection.context.headers
      ? connection.context
      : req;
  }
}
