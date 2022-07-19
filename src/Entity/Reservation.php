<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
/**
 * @ORM\Entity(repositoryClass=ReservationRepository::class)
 * @ApiResource(
 * normalizationContext={
 *      "groups"={"reservation_read"}
 * }
 * )
 */
class Reservation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups({"reservation_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=20)
     * @groups({"reservation_read"})
     */
    private $etat;

    /**
     * @ORM\ManyToOne(targetEntity=Voyageur::class)
     * @ORM\JoinColumn(nullable=false)
     * @groups({"reservation_read"})
     */
    private $voyageur;

    /**
     * @ORM\ManyToOne(targetEntity=Trajet::class)
     * @ORM\JoinColumn(nullable=false)
     * @groups({"reservation_read"})
     * @ApiSubresource()
     * @ApiFilter(SearchFilter::class, properties={"etat" ,"voyageur"})
     */
    private $trajet;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getVoyageur(): ?Voyageur
    {
        return $this->voyageur;
    }

    public function setVoyageur(?Voyageur $voyageur): self
    {
        $this->voyageur = $voyageur;

        return $this;
    }

    public function getTrajet(): ?Trajet
    {
        return $this->trajet;
    }

    public function setTrajet(?Trajet $trajet): self
    {
        $this->trajet = $trajet;

        return $this;
    }
}
