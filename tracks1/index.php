<?php
require 'vendor/autoload.php';

$dataDir = "./data";
$trackStore = \SleekDB\SleekDB::store('tracks', $dataDir);

$tracks = $trackStore->fetch();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>MIDI editor</title>
  <link rel="stylesheet" href="http://webprogramozas.inf.elte.hu/webprog/zh/midi/midi.css">
</head>

<body>
  <div id="main">
    <div class="row tracks-container">

      <div class="tracks">
        <h3>MIDI editor</h3>
        <a href="new.php">Add new track...</a>
        <ul>
          <?php foreach($tracks as $track) : ?>
            <li style="background-color: <?= $track['color'] ?>">
              <span>🎵 <?= $track['category'] ?></span>
              <?= $track['name'] ?> (<?= $track['instrument'] ?>)
            </li>
          <?php endforeach ?>
        </ul>
      </div>

    </div>
  </div>
</body>

</html>