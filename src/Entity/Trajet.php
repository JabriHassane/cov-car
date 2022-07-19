<?php

namespace App\Entity;

use App\Repository\TrajetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
    use ApiPlatform\Core\Annotation\ApiSubresource;
use phpDocumentor\Reflection\Types\Integer;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=TrajetRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"trajet_read"}
 * }
 * )
 * @ApiFilter(SearchFilter::class, properties={"statut"})
 */
class Trajet
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups({"reservation_read","trajet_read"})
     * 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=20)
     * @groups({"reservation_read","trajet_read"})
     */
    private $villedepart;

    /**
     * @ORM\Column(type="string", length=20)
     * @groups({"reservation_read","trajet_read"})
     */
    private $villedestination;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @groups({"reservation_read","trajet_read"})
     */
    private $jour;

    /**
     * @ORM\Column(type="date")
     * @groups({"reservation_read","trajet_read"})
     */
    private $datedepart;

    /**
     * @ORM\Column(type="date")
     * @groups({"reservation_read","trajet_read"})
     */
    private $datearrive;

    /**
     * @ORM\Column(type="time", nullable=true)
     * @groups({"reservation_read","trajet_read"})
     */
    private $heuredepart;

    /**
     * @ORM\Column(type="time", nullable=true)
     * @groups({"reservation_read","trajet_read"})
     */
    private $heurearrive;

    /**
     * @ORM\Column(type="string", length=20)
     * @groups({"reservation_read","trajet_read"})
     */
    private $typetrajet;

    /**
     * @ORM\Column(type="string", length=20)
     * @groups({"reservation_read","trajet_read"})
     */
    private $statut;

    /**
     * @ORM\ManyToOne(targetEntity=Conducteur::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"conducteurs_read","trajet_read"})
     */
    private $conducteur;

     /**
     * @ORM\OneToMany(targetEntity=Reservation::class, mappedBy="trajet")
     */
    private $reservations;

    /**
     * @ORM\OneToMany(targetEntity=Reservation::class, mappedBy="trajet")
     * 
     */
    private $Trajet;

    public function __construct()
    {
        $this->Trajet = new ArrayCollection();
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVilledepart(): ?string
    {
        return $this->villedepart;
    }

    public function setVilledepart(string $villedepart): self
    {
        $this->villedepart = $villedepart;

        return $this;
    }

    public function getVilledestination(): ?string
    {
        return $this->villedestination;
    }

    public function setVilledestination(string $villedestination): self
    {
        $this->villedestination = $villedestination;

        return $this;
    }

    public function getJour(): ?string
    {
        return $this->jour;
    }

    public function setJour(?string $jour): self
    {
        $this->jour = $jour;

        return $this;
    }

    public function getDatedepart(): ?\DateTimeInterface
    {
        return $this->datedepart;
    }

    public function setDatedepart(\DateTimeInterface $datedepart): self
    {
        $this->datedepart = $datedepart;

        return $this;
    }

    public function getDatearrive(): ?\DateTimeInterface
    {
        return $this->datearrive;
    }

    public function setDatearrive(\DateTimeInterface $datearrive): self
    {
        $this->datearrive = $datearrive;

        return $this;
    }

    public function getHeuredepart(): ?\DateTimeInterface
    {
        return $this->heuredepart;
    }

    public function setHeuredepart(?\DateTimeInterface $heuredepart): self
    {
        $this->heuredepart = $heuredepart;

        return $this;
    }

    public function getHeurearrive(): ?\DateTimeInterface
    {
        return $this->heurearrive;
    }

    public function setHeurearrive(?\DateTimeInterface $heurearrive): self
    {
        $this->heurearrive = $heurearrive;

        return $this;
    }

    public function getTypetrajet(): ?string
    {
        return $this->typetrajet;
    }

    public function setTypetrajet(string $typetrajet): self
    {
        $this->typetrajet = $typetrajet;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    
    /**
     * ana creatha
     */
    public function getvehecule()
    {
        $vecule = $this->getConducteur()->getVehicule();
            $vc = [
                "matricule" => $vecule->getMatricule(),
                "Modele" => $vecule->getModele(),
                "marque" => $vecule->getMarque(),
                "couleur" => $vecule->getCouleur(),
                "NbrPlace" => $vecule->getNbrPlace()
            ];

        return $vc ;
    }

    public function getNobmbrePlaceDisponible(){
        return $this->getConducteur()->getVehicule()->getNbrPlace() - $this->getReservations()->count();
    }
    /**
     * @return Collection|Reservation[]
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }
    
    public function getConducteur(): ?Conducteur
    {
        return $this->conducteur;
    }

    public function setConducteur(?Conducteur $conducteur): self
    {
        $this->conducteur = $conducteur;

        return $this;
    }

    /**
     * @return Collection|reservation[]
     */
    public function getTrajet(): Collection
    {
        return $this->Trajet;
    }

    public function addTrajet(reservation $trajet): self
    {
        if (!$this->Trajet->contains($trajet)) {
            $this->Trajet[] = $trajet;
            $trajet->setTrajet($this);
        }

        return $this;
    }

    public function removeTrajet(reservation $trajet): self
    {
        if ($this->Trajet->removeElement($trajet)) {
            // set the owning side to null (unless already changed)
            if ($trajet->getTrajet() === $this) {
                $trajet->setTrajet(null);
            }
        }

        return $this;
    }
}
