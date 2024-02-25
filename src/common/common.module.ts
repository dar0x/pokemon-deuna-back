import { Module } from '@nestjs/common';
import { AxiosAdapterService } from './axios.adapter/axios.adapter.service';

@Module({
  providers: [AxiosAdapterService],
  exports: [AxiosAdapterService],
})
export class CommonModule {}
