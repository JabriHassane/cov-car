<?php

namespace App\Entity;

use App\Repository\VoyageurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
/**
 * @ORM\Entity(repositoryClass=VoyageurRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"voyageur_read"}
 * }
 * )
 */
class Voyageur
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups({"reservation_read","voyageur_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=20)
     * @groups({"reservation_read","voyageur_read"})
     */
    private $cin;

    /**
     * @ORM\Column(type="integer")
     * @groups({"reservation_read","voyageur_read"})
     */
    private $tel;

    /**
     * @ORM\Column(type="blob", nullable=true)
     */
    private $photo;

    /**
     * @ORM\Column(type="string", length=10)
     * 
     */
    private $sexe;

    /**
     * @ORM\OneToMany(targetEntity=Reservation::class, mappedBy="voyageur", orphanRemoval=true)
     */
    private $Voyageur;

    /**
     * @ORM\OneToOne(targetEntity=Compte::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @groups({"reservation_read","voyageur_read"})
     * @ApiSubresource()
     * @ApiFilter(SearchFilter::class, properties={"idcompte"})
     */
    private $compte;

    public function __construct()
    {
        $this->Voyageur = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCin(): ?string
    {
        return $this->cin;
    }

    public function setCin(string $cin): self
    {
        $this->cin = $cin;

        return $this;
    }

    public function getTel(): ?int
    {
        return $this->tel;
    }

    public function setTel(int $tel): self
    {
        $this->tel = $tel;

        return $this;
    }

    public function getPhoto()
    {
        return $this->photo;
    }

    public function setPhoto($photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(string $sexe): self
    {
        $this->sexe = $sexe;

        return $this;
    }

    /**
     * @return Collection|reservation[]
     */
    public function getVoyageur(): Collection
    {   
        return $this->Voyageur;
    }

    public function addVoyageur(reservation $voyageur): self
    {
        if (!$this->Voyageur->contains($voyageur)) {
            $this->Voyageur[] = $voyageur;
            $voyageur->setVoyageur($this);
        }

        return $this;
    }

    public function removeVoyageur(reservation $voyageur): self
    {
        if ($this->Voyageur->removeElement($voyageur)) {
            // set the owning side to null (unless already changed)
            if ($voyageur->getVoyageur() === $this) {
                $voyageur->setVoyageur(null);
            }
        }

        return $this;
    }

    public function getCompte(): ?Compte
    {
        return $this->compte;
    }

    public function setCompte(?Compte $compte): self
    {
        $this->compte = $compte;

        return $this;
    }
}
