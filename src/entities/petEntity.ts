import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import enumEspecie from "../enum/enumEspecie";
import AdotanteEntity from "./adotanteEntity";
import enumPorte from "../enum/enumPorte";

@Entity()
export default class petEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome!: string;
    @Column()
    especie!: enumEspecie;
    @Column({nullable: true})
    porte?: enumPorte;
    @Column()
    dataDeNascimento!: Date;
    @Column()
    adotado!: boolean;
    @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
    adotante!: AdotanteEntity
    constructor(
        nome: string,
        especie: enumEspecie,
        dataDeNascimento: Date,
        adotado: boolean,
        porte?: enumPorte,
    ){
        this.nome = nome;
        this.especie = especie;
        this.porte = porte;
        this.dataDeNascimento = dataDeNascimento;
        this.adotado = adotado;
    }


}