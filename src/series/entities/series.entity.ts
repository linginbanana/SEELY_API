import { Rating } from '@app/rating/entities/rating.entity';
import { User } from '@app/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('series')
export class series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; //ชื่อเรื่อง

  @Column()
  year: number; //ปี

  @Column()
  description: string; //รายละเอียดการรีวิว

  @Column({ type: 'int', default: 0 }) //คะแนนของผู้แนะนำ
  recommendScore: number;

  /*@Column()
  rating: number; //คะแนนเรทติ้ง*/

  @Column()
  ownerId: number; //รหัสผู้ใช้ที่เป็นเจ้าของรีวิว

  @ManyToOne(() => Rating) //ความสัมพันธ์กับตาราง Rating
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  rating: Rating;

  @ManyToOne(() => User) //ความสัมพันธ์กับตาราง User
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  owner: User;
}
