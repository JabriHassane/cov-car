<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210426060224 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE admin ADD compte_id INT NOT NULL');
        $this->addSql('ALTER TABLE admin ADD CONSTRAINT FK_880E0D76F2C56620 FOREIGN KEY (compte_id) REFERENCES compte (id)');
        $this->addSql('CREATE INDEX IDX_880E0D76F2C56620 ON admin (compte_id)');
        $this->addSql('ALTER TABLE conducteur ADD compte_id INT NOT NULL');
        $this->addSql('ALTER TABLE conducteur ADD CONSTRAINT FK_23677143F2C56620 FOREIGN KEY (compte_id) REFERENCES compte (id)');
        $this->addSql('CREATE INDEX IDX_23677143F2C56620 ON conducteur (compte_id)');
        $this->addSql('ALTER TABLE reservation ADD trajet_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955D12A823 FOREIGN KEY (trajet_id) REFERENCES trajet (id)');
        $this->addSql('CREATE INDEX IDX_42C84955D12A823 ON reservation (trajet_id)');
        $this->addSql('ALTER TABLE voyageur ADD compte_id INT NOT NULL');
        $this->addSql('ALTER TABLE voyageur ADD CONSTRAINT FK_FE322254F2C56620 FOREIGN KEY (compte_id) REFERENCES compte (id)');
        $this->addSql('CREATE INDEX IDX_FE322254F2C56620 ON voyageur (compte_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE admin DROP FOREIGN KEY FK_880E0D76F2C56620');
        $this->addSql('DROP INDEX IDX_880E0D76F2C56620 ON admin');
        $this->addSql('ALTER TABLE admin DROP compte_id');
        $this->addSql('ALTER TABLE conducteur DROP FOREIGN KEY FK_23677143F2C56620');
        $this->addSql('DROP INDEX IDX_23677143F2C56620 ON conducteur');
        $this->addSql('ALTER TABLE conducteur DROP compte_id');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955D12A823');
        $this->addSql('DROP INDEX IDX_42C84955D12A823 ON reservation');
        $this->addSql('ALTER TABLE reservation DROP trajet_id');
        $this->addSql('ALTER TABLE voyageur DROP FOREIGN KEY FK_FE322254F2C56620');
        $this->addSql('DROP INDEX IDX_FE322254F2C56620 ON voyageur');
        $this->addSql('ALTER TABLE voyageur DROP compte_id');
    }
}
