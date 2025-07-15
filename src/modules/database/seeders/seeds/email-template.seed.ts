import { EmailTemplateEntity } from '@modules/database/entities/email-template.entity';
import { emailTemplateData } from '@modules/database/seeders/data/email-template.data';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class EmailTemplateSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(EmailTemplateEntity);
    const check = await repository.count();
    if (check) {
      return;
    }

    await repository.insert(
      emailTemplateData.map((item) =>
        repository.create({
          title: item.title,
          content: item.content,
          scope: item.scope,
          status: item.status,
        }),
      ),
    );

    return;
  }
}
