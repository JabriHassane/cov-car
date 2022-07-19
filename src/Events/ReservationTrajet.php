<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Reservation;
use App\Entity\Trajet;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Attribute\AttributeBag;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\Session\Storage\NativeSessionStorage;
use Symfony\Component\HttpFoundation\Session\Storage\SessionStorageInterface;

class ReservationTrajet implements EventSubscriberInterface
{

    private $security;
    private $entityManager;
    private $session;
    public function __construct(Security $security, EntityManagerInterface $entityManager)
    {
        $this->security = $security;
        $this->entityManager = $entityManager;
        // $this->session = $session;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setReservationTrajet', EventPriorities::PRE_VALIDATE]
        ];
    }

    // MINE t ajouté chiii Trajet directement ka ytzad id_condu 3la 7ssab dak user li dar Logine
    public function setReservationTrajet(ViewEvent $event)
    {
        $session = new Session();
        $session->start();
        //$session->set('name', 'Drak');
        // $session->get('RechercheValue');
        //$IdTrajet = $session->get('RechercheValue');

        $session = new Session(new NativeSessionStorage(), new AttributeBag());
        $session->set('token', 'a6c1e0b6');


        $token = $session->get('token');

        // $IdTrajet = $this->session->get('AB');
        $user = $this->security->getUser();
        $em = $this->entityManager;
        $queryV = $em->createQueryBuilder()
            ->select("v")
            ->from('App\Entity\Voyageur', 'v')
            ->where("v.compte= :compte")
            ->setParameter('compte', $user)
            ->getQuery()
            ->getOneOrNullResult();

        $user = $this->security->getUser();
        $em = $this->entityManager;

        $voyageur_id = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        //dd($token);
        //dd($queryV);
        if ($voyageur_id instanceof Reservation && $method === "POST") {
            //    $voyageur_id->setEtat("none");  
             //dd($queryV);
            $voyageur_id->setVoyageur($queryV);

            //$voyageur_id->setTrajet(); 
        }
    }
}
