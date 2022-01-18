import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ChangeProfileService } from '../services/changeProfile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ChangeProfileNameDto,
  ChangeProfilePasswordDto,
} from '../dto/changeProfile.dto';
import { ProfileDto } from '../dto/profile.dto';
import { IMessage } from '../interfaces/message.interface';

@Controller('change')
export class ChangeProfileController {
  constructor(private readonly changeProfileService: ChangeProfileService) {}

  @Patch('name')
  async changeName(
    @Body() body: ChangeProfileNameDto,
    @Req() req: ProfileDto,
  ): Promise<IMessage> {
    console.log(req.user);
    return await this.changeProfileService.name(body.name, req.user.email);
  }

  @Patch('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './src/uploadImages/',
      fileFilter(
        req: any,
        file: {
          fieldname: string;
          originalname: string;
          encoding: string;
          mimetype: string;
          size: number;
          destination: string;
          filename: string;
          path: string;
          buffer: Buffer;
        },
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) {
        if (
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/jpeg'
        ) {
          callback(null, true);
        } else {
          callback(null, false);
          throw new BadRequestException(
            'Only .png, .jpg and .jpeg format allowed!',
          );
        }
      },
    }),
  )
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: ProfileDto,
  ): Promise<IMessage> {
    return await this.changeProfileService.avatar(file, req.user.email);
  }

  @Patch('password')
  async changePassword(
    @Body() body: ChangeProfilePasswordDto,
    @Req() req: ProfileDto,
  ): Promise<IMessage> {
    return await this.changeProfileService.password(
      body.password,
      req.user.email,
    );
  }
}
