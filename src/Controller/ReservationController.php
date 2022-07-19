<?php

namespace App\Controller;
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

class ReservationController extends AbstractController
{   private $security;
    private $entityManager;
    public function __construct(Security $security,EntityManagerInterface $entityManager)
    {
        $this->security=$security;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/reservation", name="reservation", methods={"POST"})
     */
    public function index(Request $request,TrajetRepository $repository,EntityManagerInterface $entityManager,SerializerInterface $serializer): Response
    {
        // $user = $this->security->getUser();
        $data=json_decode($request->getContent(), true);
        if(!isset($data['idtrajet'])|| empty($data['idtrajet']))
        return new JsonResponse(['error' => "idtrajet must be set"],400);
        $em=$this->entityManager;
        $query = $em->createQueryBuilder()
        ->select("co")
        ->from('App\Entity\Reservation','co')
        ->where("co.trajet= :traj")
        ->andWhere("co.etat='none'")
        ->setParameter('traj',$data['idtrajet'])
        ->getQuery()
        ->getResult();
      // dd($query);
       $ar=[];
       foreach($query as $querys){
      $ar[]=[
        "IDTrajet"=>$querys->getId(),
        "Etat"=>$querys->getEtat(),
        "voyageurid"=>$querys->getVoyageur()->getID(),
        "cin"=>$querys->getVoyageur()->getCin(),
        "tel"=>$querys->getVoyageur()->getTel(),
        "nom"=>$querys->getVoyageur()->getCompte()->getNom(),
        "prenom"=>$querys->getVoyageur()->getCompte()->getPrenom()
        ];  
       } 
        return new JsonResponse($ar);
    }
}
