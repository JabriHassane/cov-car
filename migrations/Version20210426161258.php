<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210426161258 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE admin DROP INDEX IDX_880E0D76F2C56620, ADD UNIQUE INDEX UNIQ_880E0D76F2C56620 (compte_id)');
        $this->addSql('ALTER TABLE conducteur DROP INDEX IDX_23677143F2C56620, ADD UNIQUE INDEX UNIQ_23677143F2C56620 (compte_id)');
        $this->addSql('ALTER TABLE voyageur DROP INDEX IDX_FE322254F2C56620, ADD UNIQUE INDEX UNIQ_FE322254F2C56620 (compte_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE admin DROP INDEX UNIQ_880E0D76F2C56620, ADD INDEX IDX_880E0D76F2C56620 (compte_id)');
        $this->addSql('ALTER TABLE conducteur DROP INDEX UNIQ_23677143F2C56620, ADD INDEX IDX_23677143F2C56620 (compte_id)');
        $this->addSql('ALTER TABLE voyageur DROP INDEX UNIQ_FE322254F2C56620, ADD INDEX IDX_FE322254F2C56620 (compte_id)');
    }
}
