import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor() {
    super({
      // supabaseUrl: process.env.SUPABASE_URL,
      supabaseUrl: 'https://pceywmpoejzsgppovrkw.supabase.co',
      // supabaseKey: process.env.SUPABASE_KEY,
      supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMzMjI5NzMzLCJleHAiOjE5NDg4MDU3MzN9.8PwINVZ6JwDJVJhXIPiO4b00fkLxdINKHmjv9YBjs6c',
      supabaseOptions: {},
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    return super.validate(payload);
  }

  authenticate(req) {
    super.authenticate(req);
  }
}
