import { UserDocumentVerifyStatusEnum } from '@common/constants/enum/user-document.enum';
import { UserDocumentEntity } from '@modules/database/entities/user-document.entity';
import { UserEntity } from '@modules/database/entities/user.entity';

export class UserDto {
  id: string;
  name: string;
  avatar: string;
  email: string;

  constructor(props: UserEntity) {
    this.id = props.id;
    this.name = props.name;
    this.avatar = props.avatar;
    this.email = props.email;
  }
}
export class GetUserDocumentResponseDto {
  name: string;
  urls: string[];
  status: UserDocumentVerifyStatusEnum;
  verifiedAt?: Date;
  verifiedBy?: UserDto;
  note?: string;

  constructor(props: UserDocumentEntity) {
    this.name = props.name;
    this.urls = props.urls;
    this.status = props.status;
    this.verifiedAt = props.verifiedAt;
    this.verifiedBy = new UserDto(props.verifiedBy);
    this.note = props.note;
  }
}
