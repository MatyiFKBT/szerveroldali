<?php
require 'vendor/autoload.php';
use Rakit\Validation\Validator;

function add_track($trackStore, $data) {
  $data["id"] = uniqid();
  $data["notes"] = [];

  $trackStore->insert($data);
}

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
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>MIDI editor - Add new track</title>
  <link rel="stylesheet" href="http://webprogramozas.inf.elte.hu/webprog/zh/midi/midi.css">
</head>

<body>
  <h2>Add new track</h2>
  <form action="" method="post">
    <?php if ($errors) : ?>
      <div class="errors">
        <?= var_dump($errors) ?>
      </div>
    <?php endif ?>
    <div>
      <label for="name">Track name</label>
      <input type="text" id="name" name="name">
      (required)
    </div>
    <div>
      <label for="color">Color</label>
      <input type="text" id="color" name="color" placeholder="#1234af">
      (required, format: hex color code, e.g. #12af4d)
    </div>
    <div>
      <label for="category">Category</label>
      <input type="text" id="category" name="category" list="category-list">
      (required)
      <datalist id="category-list">
        <option value="Piano">
        <option value="Organ">
        <option value="Accordion">
        <option value="Strings">
        <option value="Guitar">
        <option value="Bass">
        <option value="Choir">
        <option value="Trumpet">
        <option value="Brass">
        <option value="Saxophone">
        <option value="Flute">
        <option value="Synth Lead">
        <option value="Synth Pad">
        <option value="Percussion">
        <option value="World">
        <option value="Synth effects">
        <option value="Sound effects">
      </datalist>
    </div>
    <div>
      <label for="instrument">Instrument</label>
      <select id="instrument" name="instrument">
        <option value="100">Instrument 1</option>
        <option value="200">Instrument 2</option>
        <option value="300">Instrument 3</option>
        <option value="400">Instrument 4</option>
        <option value="500">Instrument 5</option>
      </select>
      (required, number)
    </div>
    <div>
      <button type="submit">Add new track</button>
    </div>
  </form>
  <a href="index.php">Return to editor</a>
</body>

</html>