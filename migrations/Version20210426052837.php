<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210426052837 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vehicule DROP FOREIGN KEY FK_292FFF1D4A4A3511');
        $this->addSql('DROP INDEX UNIQ_292FFF1D4A4A3511 ON vehicule');
        $this->addSql('ALTER TABLE vehicule DROP vehicule_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vehicule ADD vehicule_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE vehicule ADD CONSTRAINT FK_292FFF1D4A4A3511 FOREIGN KEY (vehicule_id) REFERENCES conducteur (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_292FFF1D4A4A3511 ON vehicule (vehicule_id)');
    }
}
