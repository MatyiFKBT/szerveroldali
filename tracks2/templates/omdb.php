<form action="" method="get">
    Search term:
    <input type="text" name="search">
    <button>Search</button>
</form>
<?php foreach($movies as $m) : ?>
<details>
    <summary><?= $m->Title ?></summary>
    <img src="<?= $m->Poster ?>" alt="">
</details>
<?php endforeach ?>