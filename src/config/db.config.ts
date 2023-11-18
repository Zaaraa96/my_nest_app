import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
  database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
  logging: true,
  logger: 'file',
  entities: ['./dist/**/*entity.{ts,js}'],
  migrationsTableName: 'migrations',
  migrations: ['dist/**/migrations/*.{ts,js}'],
  synchronize: process.env.NODE_ENV === 'local',
  cli: {
    migrationsDir: `src/infrastructure/database/migrations`,
  },
  namingStrategy: new SnakeNamingStrategy(),
}));