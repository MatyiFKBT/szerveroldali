<?php
require 'vendor/autoload.php';

$dataDir = "./data";
$trackStore = \SleekDB\SleekDB::store('tracks', $dataDir);

$templates = new League\Plates\Engine('./templates');

$tracks = $trackStore->fetch();

echo $templates->render('track_list', [
  'tracks'  => $tracks
]);