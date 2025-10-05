import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOwnerIdToUser1696280000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      '"user"', // ต้องใส่ double quotes เพราะ user เป็น keyword ของ PostgreSQL
      new TableColumn({
        name: 'ownerId',
        type: 'int',
        isNullable: true, // กำหนดว่าอนุญาตให้ null ได้
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('"user"', 'ownerId');
  }
}
