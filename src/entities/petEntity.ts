import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import enumEspecie from "../enum/enumEspecie";
import AdotanteEntity from "./adotanteEntity";
import enumPorte from "../enum/enumPorte";
import AbrigoEntity from "./abrigoEntity";

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
    adotante?: AdotanteEntity
    @ManyToOne(() => AbrigoEntity, (abrigo) => abrigo.pets)
    abrigo?: AbrigoEntity
    constructor(
        nome: string,
        especie: enumEspecie,
        dataDeNascimento: Date,
        adotado: boolean,
        porte?: enumPorte,
        abrigo?: AbrigoEntity
    ){
        this.nome = nome;
        this.especie = especie;
        this.porte = porte;
        this.dataDeNascimento = dataDeNascimento;
        this.adotado = adotado;
        this.abrigo = abrigo;
    }


}