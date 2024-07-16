<script lang="ts">
  import {createEventDispatcher} from "svelte";

  export var indented:boolean=false;
  export var selected:boolean=false;
  export var disabled:boolean=false;

  const dispatch=createEventDispatcher<{
    click:void
  }>();

  /** passthrough click event, but disabled if selected or disabled */
  function h_click():void
  {
    if (selected || disabled)
    {
      return;
    }

    dispatch("click");
  }

</script>

<style lang="sass">
  @import "./link-button.sass"
</style>

<div class="link-button" class:indented on:click={h_click} class:selected class:disabled>
  <slot/>
</div>