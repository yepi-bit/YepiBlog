import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class Tag extends Base {
   @Column()
   name:string

   @ManyToOne((type)=>Tag,(Tag)=>Tag.superiors)
   superiorsid:Tag

   @OneToMany((type)=>Tag,(Tag)=>Tag.superiorsid)
   superiors:Tag[]

   @Column()
   grade:string
}