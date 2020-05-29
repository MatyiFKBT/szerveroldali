<?php
require 'vendor/autoload.php';
use Rakit\Validation\Validator;

function add_track($trackStore, $data) {
  $data["id"] = uniqid();
  $data["notes"] = [];

  $trackStore->insert($data);
}

$templates = new League\Plates\Engine('./templates');
$dataDir = "./data";
$trackStore = \SleekDB\SleekDB::store('tracks', $dataDir);
$data = [];
$errors = [];

$validator = new Validator;
$validation = $validator->validate($_POST, [
  'name'              => 'required',
  'color'             => 'required|regex:/^#[0-9a-f]{6}$/',
  'category'          => 'required',
  'instrument'        => 'required|integer',
]);

if ($_POST) {
  if ($validation->fails()) {
    $errors = $validation->errors()->all();
  } else {
    $data = $validation->getValidData();
    add_track($trackStore, $data);
    header('Location: index.php');
    exit();
  }
}

echo $templates->render('new_track', [
  'errors' => $errors
]);