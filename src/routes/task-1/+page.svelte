<script lang="ts">
  import ArtistTable from "$lib/components/artistTable.svelte";
  import type {PageData} from "./$types";
  export let data: PageData;
</script>

<div class="flex flex-col items-center justify-center">
  <ArtistTable artistVisits={data.artistVisits} />
</div>
