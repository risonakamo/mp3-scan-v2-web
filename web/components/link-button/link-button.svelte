<script lang="ts">
  export let indented:boolean=false;
</script>

<style lang="sass">
  @import "./link-button.sass"
</style>

<div class="link-button" class:indented>
  <slot/>
</div>