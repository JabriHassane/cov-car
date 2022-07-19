<?php
namespace App\Controller;

use App\Entity\Reservation;
use Symfony\Component\Security\Core\Security;

class AuthReservationsController {


    private $security;

    public function __construct(Security $security)
    {
        $this->security=$security;
    }

    public function __invoke(Reservation $data)
    {
    
        $data->setVoyageur($this->security->getUser());
        return $data;

    }


}