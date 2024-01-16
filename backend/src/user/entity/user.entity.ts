import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'email_verified' })
  emailVerified: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
