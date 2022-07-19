<?php

namespace App\Entity;

use App\Repository\ConducteurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
/**
 * @ORM\Entity(repositoryClass=ConducteurRepository::class)
 * @ApiResource(
 * normalizationContext={
 *      "groups"={"conducteurs_read"}
 * }
 * )
 */
class Conducteur
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"conducteurs_read","trajet_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=12)
     * @Groups({"conducteurs_read"})
     */
    private $cin;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"conducteurs_read","trajet_read"})
     */
    private $tel;

    /**
     * @ORM\Column(type="blob", nullable=true)
     * @Groups({"conducteurs_read"})
     */
    private $photo;

    /**
     * @ORM\Column(type="string", length=10)
     * @Groups({"conducteurs_read"})
     */
    private $sexe;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"conducteurs_read","trajet_read"})
     */
    private $condition_condu;

    /**
     * @ORM\OneToOne(targetEntity=Vehicule::class, cascade={"persist", "remove"})
     * @Groups({"conducteurs_read"})
     */
    private $Vehicule;

    /**
     * @ORM\OneToMany(targetEntity=Trajet::class, mappedBy="conducteur")
     * 
     */
    private $Conducteur;

    /**
     * @ORM\OneToOne(targetEntity=Compte::class,  cascade={"persist", "remove"})
     * @Groups({"conducteurs_read","comptes_read","trajet_read"})
     * 
     */
    private $compte;

    public function __construct()
    {
        $this->Conducteur = new ArrayCollection();
    }

    public function searchid(?int $id){
        $this->id = $id;
        $this->getCin();
        return $this->id;
        return $this->cin;
    }
    public function getId(): ?int
    {
        return $this->id;
    }
    public function setId(int $id): self
    {
        $this->id=$id;
        return $this;
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

    public function getConditionCondu(): ?string
    {
        return $this->condition_condu;
    }

    public function setConditionCondu(?string $condition_condu): self
    {
        $this->condition_condu = $condition_condu;

        return $this;
    }

    public function getVehicule(): ?vehicule
    {
        return $this->Vehicule;
    }

    public function setVehicule(?vehicule $Vehicule): self
    {
        $this->Vehicule = $Vehicule;

        return $this;
    }

    /**
     * @return Collection|trajet[]
     */
    public function getConducteur(): Collection
    {
        return $this->Conducteur;
    }
    public function getcondu(int $id){
       
        return 
            $this->id=$id;
    }

    public function addConducteur(trajet $conducteur): self
    {
        if (!$this->Conducteur->contains($conducteur)) {
            $this->Conducteur[] = $conducteur;
            $conducteur->setConducteur($this);
        }

        return $this;
    }

    public function removeConducteur(trajet $conducteur): self
    {
        if ($this->Conducteur->removeElement($conducteur)) {
            // set the owning side to null (unless already changed)
            if ($conducteur->getConducteur() === $this) {
                $conducteur->setConducteur(null);
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
