<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210426055225 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation ADD voyageur_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C8495562915402 FOREIGN KEY (voyageur_id) REFERENCES voyageur (id)');
        $this->addSql('CREATE INDEX IDX_42C8495562915402 ON reservation (voyageur_id)');
        $this->addSql('ALTER TABLE trajet CHANGE conducteur_id conducteur_id INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C8495562915402');
        $this->addSql('DROP INDEX IDX_42C8495562915402 ON reservation');
        $this->addSql('ALTER TABLE reservation DROP voyageur_id');
        $this->addSql('ALTER TABLE trajet CHANGE conducteur_id conducteur_id INT NOT NULL');
    }
}
