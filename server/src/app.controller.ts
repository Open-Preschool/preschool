import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('supabase'))
  @Get()
  getHello(@Request() req): any {
    // return this.appService.getHello();
    return req.user;
  }
}
