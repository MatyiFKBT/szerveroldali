<?php

require 'vendor/autoload.php';

$tracks = json_decode(file_get_contents('tracks.array.json'), true);
// var_dump($tracks);

$dataDir = "./data";
$trackStore = \SleekDB\SleekDB::store('tracks', $dataDir);

$trackStore->insertMany($tracks);
echo "OK";
