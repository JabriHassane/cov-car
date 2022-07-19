<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210428052142 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_23677143F2C56620 ON conducteur');
        $this->addSql('DROP INDEX UNIQ_236771434A4A3511 ON conducteur');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_23677143F2C56620 ON conducteur (compte_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_236771434A4A3511 ON conducteur (vehicule_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_236771434A4A3511 ON conducteur');
        $this->addSql('DROP INDEX UNIQ_23677143F2C56620 ON conducteur');
        $this->addSql('CREATE INDEX UNIQ_236771434A4A3511 ON conducteur (vehicule_id)');
        $this->addSql('CREATE INDEX UNIQ_23677143F2C56620 ON conducteur (compte_id)');
    }
}
