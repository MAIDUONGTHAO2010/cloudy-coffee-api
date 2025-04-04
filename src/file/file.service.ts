import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { Express } from 'express'

@Injectable()
export class FileService {
    private minioClient: Client;
    private readonly bucketName: string;

    constructor(private configService: ConfigService) {
        this.minioClient = new Client({
            endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
            accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
            secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
            useSSL: false, // Nếu MinIO chạy không có SSL
        });

        this.bucketName = this.configService.get<string>('MINIO_BUCKET');
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const fileName = `${Date.now()}-${file.originalname}`;
        await this.minioClient.putObject(this.bucketName, fileName, file.buffer);
        return fileName;
    }

      async getFileUrl(fileName: string): Promise<string> {
        return await this.minioClient.presignedUrl('GET', this.bucketName, fileName);
      }
}
