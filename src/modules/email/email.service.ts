import {
  EmailTemplateScope,
  EmailTemplateStatus,
} from '@common/constants/enum/email.enum';
import { ErrorCode } from '@common/constants/error.constant';
import { getErrorMessage } from '@common/utils/error-logger.util';
import { EmailTemplateEntity } from '@modules/database/entities/email-template.entity';
import { SendOtpEmailDto } from '@modules/email/dto/send-email.dto';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { compile } from 'handlebars';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    @InjectRepository(EmailTemplateEntity)
    private readonly emailTemplateRepository: Repository<EmailTemplateEntity>,

    private readonly mailerService: MailerService,
  ) {}

  async sendOtp(dto: SendOtpEmailDto): Promise<boolean> {
    const template = await this.emailTemplateRepository.findOneBy({
      scope: EmailTemplateScope.OTP,
      status: EmailTemplateStatus.ACTIVE,
    });
    if (!template) {
      throw new NotFoundException(ErrorCode.EMAIL_TEMPLATE_NOT_FOUND);
    }

    const compiled = compile(template.content);

    try {
      await this.mailerService.sendMail({
        from: process.env.SMTP_SENDER_EMAIL,
        to: dto.receiver,
        subject: template.title,
        html: compiled({ otp: dto.otp }),
      });

      this.logger.log(`OTP email sent successfully to ${dto.receiver}`);
      return true;
    } catch (err) {
      this.logger.error(
        getErrorMessage('SEND_OTP_EMAIL_FAILED', { email: dto.receiver }),
        err,
      );
      return false;
    }
  }
}
