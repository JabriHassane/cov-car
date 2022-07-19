<?php

namespace App\Repository;

use App\Entity\Voyageur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Voyageur|null find($id, $lockMode = null, $lockVersion = null)
 * @method Voyageur|null findOneBy(array $criteria, array $orderBy = null)
 * @method Voyageur[]    findAll()
 * @method Voyageur[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VoyageurRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Voyageur::class);
    }

    // /**
    //  * @return Voyageur[] Returns an array of Voyageur objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Voyageur
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
