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
      supabaseUrl: 'http://localhost:54321',
      // supabaseKey: process.env.SUPABASE_KEY,
      supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIn0.M2d2z4SFn5C7HlJlaSLfrzuYim9n',
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
