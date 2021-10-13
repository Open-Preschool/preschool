import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseStrategy } from './supabase.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [AuthService, SupabaseStrategy],
  exports: [AuthService, SupabaseStrategy],
})
export class AuthModule {}
