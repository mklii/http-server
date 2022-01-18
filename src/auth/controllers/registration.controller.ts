import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from '../services/registration.service';
import { RegistrationDto } from '../dto/registration.dto';
import { IMessage } from '../interfaces/message.interface';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<IMessage> {
    return await this.registrationService.registration(
      registrationDto.username as string,
      registrationDto.email as string,
      registrationDto.password as string,
      registrationDto.role as number,
    );
  }
}
