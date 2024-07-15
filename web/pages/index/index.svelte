<script lang="ts">

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
      <div class="link-button">
        - Open Item
      </div>
    </div>

    <div class="control-container">
      <div class="link-button">- Next Item</div>
    </div>

    <div class="control-container">
      <h2>Decision:</h2>
      <div class="link-button indented">- YES</div>
      <div class="link-button indented">- NO</div>
      <div class="link-button indented">- MAYBE</div>
    </div>
  </div>
</main>