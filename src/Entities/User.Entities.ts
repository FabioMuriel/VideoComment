import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Video } from './Video.Entities';
import { Comment } from './Comment.Entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: null, onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date | null;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => Video, (video) => video.user) // Relación uno a muchos
  videos: Video[];

  @OneToMany(() => Comment, (comment) => comment.user) // Relación uno a muchos
  comments: Comment[];
}
