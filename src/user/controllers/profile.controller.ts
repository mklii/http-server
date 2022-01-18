import { Controller, Get, Req } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ProfileDto } from '../dto/profile.dto';
import { IProfile } from '../interfaces/profile.interface';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async profile(@Req() req: ProfileDto): Promise<IProfile> {
    return this.profileService.profile(req.user.id, req.user.email);
  }
}
