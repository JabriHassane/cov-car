<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Trajet;
use App\Entity\Conducteur;
use Doctrine\DBAL\Types\ObjectType;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent ;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Expr\Cast\Object_;

class TrajetsConducteur implements EventSubscriberInterface{

    private $security;
    private $entityManager;
    public function __construct(Security $security,EntityManagerInterface $entityManager)
    {
        $this->security=$security;
        $this->entityManager = $entityManager;
    }
    public static function getSubscribedEvents()
    {
        return[
            KernelEvents::VIEW => ['setConducteurForTrajet', EventPriorities::PRE_VALIDATE]
        ];
    }
    
     // MINE t ajouté chiii Trajet directement ka ytzad id_condu 3la 7ssab dak user li dar Logine
    public function setConducteurForTrajet(ViewEvent $event){

        $user = $this->security->getUser();
        //$roles = $this->security->getUser()->getRoles();
        $em=$this->entityManager;
        $query = $em->createQueryBuilder()
        ->select("co")
        ->from('App\Entity\Conducteur','co')
        ->where("co.compte= :compte")
        ->setParameter('compte',$user)
        ->getQuery()
        //->getResult();
    
        ->getOneOrNullResult();
       // dd($query);
        $conducteur_id= $event->getControllerResult();
        $method=$event->getRequest()->getMethod();
       
        if($conducteur_id instanceof Trajet && $method === "POST"){
              //choper l'utilisateur actuellement connecté
            $conducteur_id -> setConducteur($query);  
            $conducteur_id -> setStatut('Encours');  
            }
        }
    
}