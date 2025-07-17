import { UserRole } from '@common/constants/enum/user.enum';
import { UserEntity } from '@modules/database/entities/user.entity';
import { userData } from '@modules/database/seeders/data/user.data';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);
    const check = await repository.count({ where: { role: UserRole.ADMIN } });
    if (check) {
      return;
    }

    await repository.insert(
      userData.map((item) =>
        repository.create({
          email: item.email,
          password: item.password,
          role: item.role,
          status: item.status,
          name: item.name,
        }),
      ),
    );

    return;
  }
}
