import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../enum/user.enum';

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

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role = Role.User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken;
}
