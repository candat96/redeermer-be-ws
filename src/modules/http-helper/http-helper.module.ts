import { HttpHelperService } from '@modules/http-helper/http-helper.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [HttpHelperService],
  exports: [HttpHelperService],
})
export class HttpHelperModule {}
