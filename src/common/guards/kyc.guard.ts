import { ErrorCode } from '@common/constants/error.constant';
import { UserDocumentService } from '@modules/user-document/user-document.service';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class KycGuard implements CanActivate {
  constructor(private readonly kycService: UserDocumentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const verified = await this.kycService.isUserVerified(user.id);
    if (!verified) {
      throw new ForbiddenException(ErrorCode.ACCOUNT_HAS_NOT_KYC);
    }

    return true;
  }
}
