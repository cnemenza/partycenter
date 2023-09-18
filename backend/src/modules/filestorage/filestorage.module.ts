import { Module } from '@nestjs/common';
import { FileStorageController } from './filestorage.controller';
import { FileStorageService } from './filestorage.service';

@Module({
  providers: [FileStorageService],
  controllers: [FileStorageController],
  exports: [FileStorageService],
})
export class FileStorageModule {}
