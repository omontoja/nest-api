import { Table, Column, Model, DataType, CreatedAt } from 'sequelize-typescript';

@Table
export class Invoice extends Model {
 
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: Number;

  @Column({
		type: DataType.STRING(44),
    allowNull: false,
    unique: true
	})
  code: String;

  @Column({
		type:	DataType.ENUM({
  		values: ['created', 'left', 'returned']
		}),
    allowNull: false
	})
  status: String;

  @CreatedAt public createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  leftAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  returnedAt: Date;
}