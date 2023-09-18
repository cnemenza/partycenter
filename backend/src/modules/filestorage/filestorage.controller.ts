import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { FileStorageService } from './filestorage.service';

@Public()
@Controller('filestorage')
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Get('/download/:filename')
  public async downloadFile(@Param('filename') filename: string) {
    return await this.fileStorageService.downloadFile(filename);
  }
}
