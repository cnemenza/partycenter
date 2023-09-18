import { Injectable, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileStorageService {
  constructor(private configService: ConfigService) {}

  BASE_PATH = this.configService.get('FILE_STORAGE_PATH');

  public async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const buffer = file.buffer;
      const extension = path.extname(file.originalname);
      const fileName: string = uuidv4() + extension;
      const fullPath = this.BASE_PATH + fileName;

      fs.writeFile(fullPath, buffer, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(fileName);
      });
    });
  }

  public async deleteFile(fileName: string): Promise<void> {
    const fullPath = path.join(this.BASE_PATH, fileName);
    return new Promise((resolve, reject) => {
      fs.stat(fullPath, function (err) {
        if (err) {
          reject(err);
          return;
        }

        fs.unlink(fullPath, function (err) {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        });
      });
    });
  }

  public async downloadFile(fileName: string): Promise<StreamableFile> {
    const file = fs.createReadStream(path.join(this.BASE_PATH, fileName));
    return new StreamableFile(file);
  }
}
