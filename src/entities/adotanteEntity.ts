import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "../entities/endereco";
import petEntity from "./petEntity";

@Entity()
export default class AdotanteEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  senha: string;
  @Column()
  celular: string;
  @Column({nullable: true})
  foto?: string;

  @OneToOne(() => EnderecoEntity, {nullable: true, cascade:true, eager:true})
  @JoinColumn()
  endereco?: EnderecoEntity;
  @OneToMany(() => petEntity, (pet) => pet.adotante)
  @JoinColumn()
  pets!: petEntity[];

  constructor(
    nome: string,
    senha: string,
    celular: string,
    foto?: string,
    endereco?: EnderecoEntity
  ) {
    this.nome = nome;
    this.senha = senha;
    this.foto = foto;
    this.celular = celular;
    this.endereco = endereco;
  }
}