<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\TrajetRepository;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

class TrajetControllerH extends AbstractController
{   
     /**
    * @Route("/touslestrajet", name="touslestrajet", methods={"POST"})
    */
    public function tousLesTrajets(Request $request,TrajetRepository $repository,SerializerInterface $serializer){
         
         
       
        $trajets=$repository->findBy([
            "statut"=>"Validé",
        ]) ;
        $ar=[];
        foreach ($trajets as $trajet){
            $ar[]=[ 
                "IDTrajet"=>$trajet->getId(),
                "villedepart"=>$trajet->getVilledepart(),
                "villedestination"=>$trajet->getVilledestination(),
                "statut"=>$trajet->getStatut(),
                "datedepart"=>$trajet->getDatedepart()->format('m/d/Y'),
                "datearrive"=>$trajet->getDatearrive()->format('m/d/Y'),
                "heuredepart"=>$trajet->getHeuredepart() == null ? '' : $trajet->getHeuredepart()->format('H:i:s'),
                "heurearrive"=>$trajet->getHeurearrive() == null ? '' : $trajet->getHeurearrive()->format('H:i:s'),
                "marque"=>$trajet->getConducteur()->getVehicule()->getMarque(),
                "modele"=>$trajet->getConducteur()->getVehicule()->getModele(),
                "couleur"=>$trajet->getConducteur()->getVehicule()->getCouleur(),
                "NPD" => $trajet->getNobmbrePlaceDisponible(),
                "jours" => explode(',',$trajet->getJour()),
                "nom"=>$trajet->getConducteur()->getCompte()->getNom(),
                "prenom" => $trajet->getConducteur()->getCompte()->getPrenom(),
                "tel" => $trajet->getConducteur()->getTel(),
                'Condition' => $trajet->getConducteur()->getConditionCondu(),
                "email" => $trajet->getConducteur()->getCompte()->getEmail()
            ];
        }

        return new JsonResponse($ar);
    }

    /**
     * @Route("/trajet", name="trajet", methods={"POST"})
     */
    public function index(Request $request,TrajetRepository $repository,SerializerInterface $serializer): Response
    {


        $data=json_decode($request->getContent(), true);
        if(!isset($data['villedepart'])|| empty($data['villedepart']))
            return new JsonResponse(['error' => "villedepart must be set"],400);
        if(!isset($data['villedepart'])|| empty($data['villedepart']))
            return new JsonResponse(['error' => "villedepart must be set"],400);
        if(!isset($data['type'])|| empty($data['type']))
            return new JsonResponse(['error' => "type must be set"],400);


        switch(strtoupper($data['type'])){

            case "PONCTUEL":
                $datedepart= \DateTime::createFromFormat("m/d/Y",$data["datedepart"]); 
                $trajets = $repository->findBy([
                    'villedepart' => $data['villedepart'],
                    'villedestination' => $data['villedestination'],
                    'typetrajet' => 'Ponctuel',
                    'statut' =>'validé',
                    'datedepart' => $datedepart
                    ]
                );
               
                break;
            case "REGULIER":
                if(!isset($data['jours']) || empty($data['jours']))
                    return new JsonResponse(['error' => "jours must be set (lundi,jeudi ...)"],400);
                $trajets = $repository->findBy([
                        'villedepart' => $data['villedepart'],
                        'villedestination' => $data['villedestination'],
                        'typetrajet' => 'Regulier',
                        'statut' =>'validé'
                    ]
                );
                $requestjours = explode(',',$data['jours']);
                $t = [];
                foreach ($trajets as $trajet) {
                    $jours = explode(',',$trajet->getJour());
                  if($this->in_array_any($requestjours,$jours))
                    $t[] = $trajet ;

                }
                $trajets = $t;


                break;
            default :
                return new JsonResponse(['error' => "type must be PONCTUEL or REGULIER"],400);

        }
        $ar=[];
        foreach ($trajets as $trajet){
            $ar[]=[
                "IDTrajet"=>$trajet->getId(),
                "villedepart"=>$trajet->getVilledepart(),
                "villedestination"=>$trajet->getVilledestination(),
                "statut"=>$trajet->getStatut(),
                "datedepart"=>$trajet->getDatedepart()->format('m/d/Y'),
                "datearrive"=>$trajet->getDatearrive()->format('m/d/Y'),
                "heuredepart"=>$trajet->getHeuredepart() == null ? '' : $trajet->getHeuredepart()->format('H:i:s'),
                "heurearrive"=>$trajet->getHeurearrive() == null ? '' : $trajet->getHeurearrive()->format('H:i:s'),
                "marque"=>$trajet->getConducteur()->getVehicule()->getMarque(),
                "modele"=>$trajet->getConducteur()->getVehicule()->getModele(),
                "couleur"=>$trajet->getConducteur()->getVehicule()->getCouleur(),
                "NPD" => $trajet->getNobmbrePlaceDisponible(),
                "jours" => explode(',',$trajet->getJour()),
                "nom"=>$trajet->getConducteur()->getCompte()->getNom(),
                "prenom" => $trajet->getConducteur()->getCompte()->getPrenom(),
                "tel" => $trajet->getConducteur()->getTel(),
                'Condition' => $trajet->getConducteur()->getConditionCondu(),
                "email" => $trajet->getConducteur()->getCompte()->getEmail()
            ];
        }

        return new JsonResponse($ar);
    }


   private function in_array_any($needles, $haystack) {
        return (boolean)array_intersect($needles, $haystack);
    }
}
