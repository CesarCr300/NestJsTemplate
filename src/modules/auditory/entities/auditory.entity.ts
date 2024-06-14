import { Column, DeleteDateColumn } from 'typeorm';

export class AuditoryEntity {
  @Column({ name: 'int_created_by', nullable: true })
  createdBy: number;
  @Column({
    name: 'dtt_created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({ name: 'int_updated_by', nullable: true })
  updatedBy: number;
  @Column({
    name: 'dtt_updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'datetime', name: 'dtt_deleted_at' })
  deletedAt: Date;
}
