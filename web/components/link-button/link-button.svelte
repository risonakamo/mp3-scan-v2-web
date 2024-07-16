<script lang="ts">
  import {createEventDispatcher} from "svelte";

  const dispatch=createEventDispatcher<{
    click:void
  }>();

  export var indented:boolean=false;
  export var selected:boolean=false;

  /** click only triggered if element is not selected */
  function h_click():void
  {
    if (selected)
    {
      return;
    }

    dispatch("click");
  }

</script>

<style lang="sass">
  @import "./link-button.sass"
</style>

<div class="link-button" class:indented on:click={h_click} class:selected>
  <slot/>
</div>