<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Compte;
use App\Entity\Conducteur;
use App\Entity\Vehicule;
use App\Entity\Voyageur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent ;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class VoyageurComptesSubscriber implements EventSubscriberInterface{

    private $security;
    private $entityManager;
    private $auth;
    public function __construct(Security $security,  EntityManagerInterface $entityManager,AuthorizationCheckerInterface $checker)
    {
        $this->security=$security;
        $this->entityManager = $entityManager;
        $this->auth=$checker;
    }
    public static function getSubscribedEvents()
    {
        return[
            KernelEvents::VIEW => ['setVoyageurForComptes', EventPriorities::PRE_VALIDATE]
        ];

    }


    // MINE t ajouté chiii Trajet directement ka ytzad id_condu 3la 7ssab dak user li dar Logine
    
    public function setVoyageurForComptes(ViewEvent $event){

        $compte= $event->getControllerResult();
        $voyag= $event->getControllerResult();
        $conduc= $event->getControllerResult();
        $method=$event->getRequest()->getMethod();
        $em=$this->entityManager;


      
        if($compte instanceof Compte && $method === "POST"){
        if($compte->getRoles()[0] === "voyageur"){
          $voyag =new Voyageur;
          $voyag-> setCin("fzz");
          $voyag-> setTel(060000000);
          $voyag-> setSexe("Male");
          $voyag -> setCompte($compte);
          $em->persist($voyag);
          $em->flush();
        }
        else if($compte->getRoles()[0] === "conducteur"){

            $conduc =new Conducteur;
            $conduc-> setCin("fzz");
            $conduc-> setTel(060000000);
            $conduc-> setSexe("Male");
            $conduc -> setCompte($compte);
            $em->persist($conduc);
            
            $vehicule= new Vehicule;
            $vehicule-> setMatricule('null');
            $vehicule-> setMarque('null');
            $vehicule-> setModele('null');
            $vehicule-> setCouleur('null');
            $vehicule-> setNbrPlace(0);
            $em->persist($vehicule);
            $em->flush();

            $IDV = $vehicule->getId();
            $query = $em->createQueryBuilder()
            ->select("v")
            ->from('App\Entity\Vehicule','v')
            ->where("v.id=:VID")
            ->setParameter('VID', $IDV)
            ->getQuery()
            ->getOneOrNullResult();
            $conduc -> setVehicule($query);

        }
        // dd($compte->getRoles()[0]);
        }
        }
   
}