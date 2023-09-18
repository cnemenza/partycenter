import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditableEntity {
  @CreateDateColumn({
    type: 'datetime',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'datetime',
  })
  updatedAt: Date;
}
