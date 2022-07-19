<?php

namespace App\Events;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedSubscriber {

    private $security;
    private $entityManager;
    public function __construct(Security $security, EntityManagerInterface $entityManager)
    {
        $this->security = $security;
        $this->entityManager = $entityManager;
    }

    public function updateJwtData(JWTCreatedEvent $event){


        $users = $this->security->getUser();
        $em = $this->entityManager;
           $queryV = $em->createQueryBuilder()
            ->select("v.id")
            ->from('App\Entity\Voyageur', 'v')
            ->where("v.compte= :compte")
            ->setParameter('compte', $users)
            ->getQuery()
            ->getOneOrNullResult();
            $queryC = $em->createQueryBuilder()
            ->select("c.id")
            ->from('App\Entity\Conducteur', 'c')
            ->where("c.compte= :compte")
            ->setParameter('compte', $users)
            ->getQuery()
            ->getOneOrNullResult();
       // dd($queryV['id']);
        
        $user=$event->getUser();
        $role=$user ->getRoles()[0];
        // dd($role);
        $data=$event->getData();
        if($role=='conducteur'){
            $data['idc']=$queryC['id'];
            $data['id']= $user ->getID();
            $data['nom']= $user ->getNom();
            $data['prenom']= $user ->getPrenom();
            $data['roles']= $user ->getRoles()[0];
           $event->setData($data);
        }
        else if($role=='voyageur'){
            $data['idv']=$queryV['id'];
            $data['id']= $user ->getID();
            $data['nom']= $user ->getNom();
            $data['prenom']= $user ->getPrenom();
            $data['roles']= $user ->getRoles()[0];
            $event->setData($data);
        }
        else if($role=='ROLE_ADMIN'){
            $data['id']= $user ->getID();
            $data['nom']= $user ->getNom();
            $data['prenom']= $user ->getPrenom();
            $data['roles']= $user ->getRoles()[0];
            $event->setData($data);
        }
     
       //    dd($event->getData());
    }
}