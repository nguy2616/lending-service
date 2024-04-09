import { DataSource, DataSourceOptions } from 'typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '../../environments';
import { DepositEntity } from '../deposit/entities/deposit.entity';
import { DeadLetterQueueEntity } from '../dlq/entities/dlq.entity';
import { WithdrawEntity } from '../withdraw/entities/withdraw.entity';

const entities = [WithdrawEntity, DepositEntity, DeadLetterQueueEntity];
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities,
  //migrations: ['dist/migrations/*{.ts,.js}'],
  //migrationsRun: false,
  synchronize: true,
};

export const dataSource = new DataSource(dataSourceOptions);
