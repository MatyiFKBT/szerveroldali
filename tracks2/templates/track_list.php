<?php $this->layout('layout', [
  'title' => 'Track list']
) ?>

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

<?php $this->start('js') ?>
  <script src="index.js"></script>
<?php $this->stop() ?>