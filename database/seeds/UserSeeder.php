<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'username' => ['McPerry_', 'seamonster618', 'jbrtfrnndz', 'youngG', 'kaysabelle', 'panelist1', 'panelist2', 'panelist3'],
            'email' => ['mack.perry.co@gmail.com', 'acvtela@yahoo.com', 'jbrtfrnndz@gmail.com', 'guiang.justing@gmail.com', 'kaye.rosacia@gmail.com', 'panelist1@sample.com', 'panelist2@sample.com', 'panelist3@sample.com'],
            'password' => ['237845691', 'cuteasianboi', 'hentaihart', 'Justin23', 'Awitser13', 'panelist1', 'panelist2', 'panelist3']
        ];
        $types = ['SUPER', 'ADMIN', 'FACIL', 'USER'];

        for ($i = 0; $i < 5; $i++) {
            foreach ($types as $type) {
                $user = new User;

                if ($type == 'SUPER') {
                    $user->username = $data['username'][$i];
                    $user->email = $data['email'][$i];
                } else {
                    $user->username = $data['username'][$i] . '_' . $type;
                    $user->email = $type . '_' . $data['email'][$i];
                }
                $user->type = $type;
                $user->password = $data['password'][$i];
                $user->save();
            }
        }
    }
}
