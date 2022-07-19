<?php

namespace App\Controller;

use App\Repository\ReservationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\TrajetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Security\Core\Security;

class ReservationDistinctController extends AbstractController
{
  private $security;
  private $entityManager;
  public function __construct(Security $security, EntityManagerInterface $entityManager)
  {
    $this->security = $security;
    $this->entityManager = $entityManager;
  }
  /**
   * @Route("/reservations", name="reservations", methods={"GET"})
   */
  public function index(Request $request, SerializerInterface $serializer): Response
  {
    $user = $this->security->getUser();
    $em = $this->entityManager;
    $query = $em->createQueryBuilder()
      ->select("DISTINCT T.id,T.villedepart,T.villedestination,T.jour,T.datedepart,T.datearrive,T.heuredepart,
              T.heurearrive,T.typetrajet,T.statut")
      ->from('App\Entity\Reservation','r')
      ->join('r.trajet','T')
      ->join("T.conducteur","c")
      ->where("c.compte= :compte and r.etat= :etat")
      ->setParameter('compte', $user)
      ->setParameter('etat', 'none')
      ->getQuery()
      ->getResult();
      //dd($query);
      /************************************** ********************************************/  
      // $query3 = $em->createQueryBuilder()
      // ->select("DISTINCT T.id")
      // ->from('App\Entity\Reservation', 'r')
      // ->join('App\Entity\Trajet', 'T')
      // ->join("T.conducteur", "c")
      // ->where("c.compte= :compte ")
      // ->setParameter('compte', $user)
      // ->getQuery()
      // ->getResult();
      
      // $query2 = $em->createQueryBuilder()
      // ->select("r.id")
      // ->from('App\Entity\Reservation','r')
      // ->where("r.trajet= :trajetid")
      // ->setParameter('trajetid',$query3)
      // ->getQuery()
      // ->getResult();
      // dd($query2);
    
      //dd($query3);
    //dd($query['0']["idres"]);
    //dd($query["idres"]);
    $ar = [];
    foreach ($query as $querys) {
      $ar[] = [
        "ID" => $querys['id'],
        "villedepart" => $querys['villedepart'],
        "villedestination" => $querys['villedestination'],
        "jour" => $querys['jour'],
        "datedepart" => $querys['datedepart']->format('d/m/Y'),
        "datearrive" => $querys['datearrive']->format('d/m/Y'),
        "heuredepart" => $querys['heuredepart'] == null ? '' :$querys['heuredepart']->format('H:i:s'),
        "heurearrive" => $querys['heurearrive'] == null ? '' :$querys['heurearrive']->format('H:i:s'),
        "typetrajet" => $querys['typetrajet']
      ];
    }
    //dd($ar);

    return new JsonResponse($ar);
  }
  /**
   * @Route("/reservationspartrajet", name="reservationspartrajet", methods={"post"})
   */
  public function reservationpartrajet(Request $request,ReservationRepository $repository, SerializerInterface $serializer): Response
  {
      $data=json_decode($request->getContent(), true);
      $reservation = $repository->findBy([
        'trajet' => $data['trajet']
        ]);


        $ar = [];
        foreach ($reservation as $reservations) {
          $ar[] = [
            "idreservation" => $reservations->getId()
          ];
        }
    return new JsonResponse($ar);
  }
}
