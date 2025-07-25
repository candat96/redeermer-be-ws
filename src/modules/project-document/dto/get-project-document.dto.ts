import { RangeDateRequestDto } from '@common/classes/request.dto';
import {
  ProjectDocumentType,
  ProjectDocumentVerifyStatusEnum,
} from '@common/constants/enum/project-document.enum';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { UserEntity } from '@modules/database/entities/user.entity';

export class GetProjectDocumentDto extends RangeDateRequestDto {}

export class ReviewerDto {
  id: string;
  name: string;
  role: string;

  constructor(props: UserEntity) {
    this.id = props.id;
    this.name = props.name;
    this.role = props.role;
  }
}
export class GetProjectDocumentResponse {
  id: string;
  fileName: string;
  files: string;
  type: ProjectDocumentType;
  status: ProjectDocumentVerifyStatusEnum;
  note?: string;
  verifiedAt?: Date;
  verifiedBy?: ReviewerDto;

  constructor(entity: ProjectDocumentEntity) {
    this.id = entity.id;
    this.fileName = entity.fileName;
    this.files = entity.files;
    this.type = entity.type;
    this.status = entity.status;
    this.note = entity.note ?? null;
    this.verifiedAt = entity.verifiedAt ?? null;
    this.verifiedBy = entity.verifiedBy ? new ReviewerDto(entity.verifiedBy) : null;
  }
}
