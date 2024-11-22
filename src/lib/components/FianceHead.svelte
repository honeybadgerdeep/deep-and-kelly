<script>
    export let picture;
    export let name;
</script>

<div class="fiance-head">
    <img src={`img/${picture}`} alt={name}/>
    <p>{name}</p>
</div>