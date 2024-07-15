<script lang="ts">
    import LinkButton from "@/components/link-button/link-button.svelte";
</script>

<style lang="sass">
  @import "./index.sass"
</style>

<main>
  <div class="info">
    <p>Name: <span class="name">something.mp3</span></p>
    <p>Folder: <span class="folder">somewhere</span></p>
    <p>Progress: <span class="progress1">10</span> / <span class="progress2">21</span></p>
    <p>[=====&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</p>
  </div>

  <div class="controls">
    <div class="control-container">
      <LinkButton>- Open Item</LinkButton>
    </div>

    <div class="control-container">
      <LinkButton>- Next Item</LinkButton>
    </div>

    <div class="control-container">
      <h2>Decision:</h2>
      <LinkButton indented>- YES</LinkButton>
      <LinkButton indented>- NO</LinkButton>
      <LinkButton indented>- MAYBE</LinkButton>
    </div>
  </div>
</main>