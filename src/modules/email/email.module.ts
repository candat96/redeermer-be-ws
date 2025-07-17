import { EmailTemplateEntity } from '@modules/database/entities/email-template.entity';
import { EmailService } from '@modules/email/email.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailTemplateEntity]),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.SMTP_HOST,
          port: +process.env.SMTP_PORT,
          secure: false,
          auth: {
            user: process.env.SMTP_SENDER_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
