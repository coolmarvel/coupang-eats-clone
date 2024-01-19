import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, OneToOne, UpdateDateColumn } from 'typeorm';
import { Role } from '../enum/user.enum';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role = Role.User;

  @Column()
  image: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken;
}
