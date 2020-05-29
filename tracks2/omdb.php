<?php
require 'vendor/autoload.php';

$search = $_GET['search'] ?? '';

$results = [];
if ($search) {
    $request = Requests::get(
        "http://www.omdbapi.com/?s=${search}&apikey=2dd0dbee");
    $resp = json_decode($request->body);
    $results = $resp->Search;
}

$templates = new League\Plates\Engine('./templates');
echo $templates->render('omdb', [
    'movies' => $results
]);