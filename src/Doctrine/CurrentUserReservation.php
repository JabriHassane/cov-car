<?php
namespace App\Doctrine;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Compte;
use App\Entity\Conducteur;
use App\Entity\Reservation;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserReservation implements QueryCollectionExtensionInterface, QueryItemExtensionInterface{

    private $security;
    private $auth;
    public function __construct(Security $security, AuthorizationCheckerInterface $checker)
    {
        $this->security=$security;
        $this->auth=$checker;
    }

    private function addwhere(QueryBuilder $queryBuilder,  string $resourceClass){
        $user= $this->security->getUser();
        $roles= $this->security->getUser()->getRoles();

  
        if($roles [0] === "conducteur"){
            if(($resourceClass === Conducteur::class || $resourceClass === Trajet::class) && 
           !$this->auth->isGranted('ROLE_ADMIN')&& $user instanceof Compte){
            $rootAlias = $queryBuilder->getRootAliases()[0];

            if($resourceClass === Conducteur::class){
                $queryBuilder -> andWhere("$rootAlias.compte = :compte");
            }
            else if($resourceClass === Trajet::class){

             $queryBuilder->join("$rootAlias.conducteur","c")
                          ->andwhere("c.compte= :compte");
            }
            $queryBuilder->setParameter("compte",$user);
        }
            

        if(($resourceClass === Conducteur::class || $resourceClass === Reservation::class) && 
           !$this->auth->isGranted('ROLE_ADMIN')&& $user instanceof Compte){
            $rootAlias = $queryBuilder->getRootAliases()[0];

            if($resourceClass === Conducteur::class){
                $queryBuilder -> andWhere("$rootAlias.compte = :compte");
            }
            else if($resourceClass === Reservation::class){
                $queryBuilder->join("$rootAlias.trajet","t")
                             ->join("t.conducteur","c")
                             ->andwhere("c.compte= :compte");
            }
            $queryBuilder->setParameter("compte",$user);
        
        } 

        }
        //dd($roles[0]);
        if($roles[0] == "voyageur"){
            if(($resourceClass === Voyageur::class || $resourceClass === Reservation::class) && 
            !$this->auth->isGranted('ROLE_ADMIN')&& $user instanceof Compte){
             $rootAlias = $queryBuilder->getRootAliases()[0];
 
             if($resourceClass === Voyageur::class){
                 $queryBuilder -> andWhere("$rootAlias.compte = :compte");
             }
             else if($resourceClass === Reservation::class){
                 $queryBuilder->join("$rootAlias.voyageur","v")
                              ->andwhere("v.compte= :compte");
             }
             $queryBuilder->setParameter("compte",$user);
            // dd($queryBuilder);
         } 
         //dd($roles);
        }
        
    }
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
      $this->addwhere($queryBuilder,$resourceClass);
    }
    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->addwhere($queryBuilder,$resourceClass);
    }
}