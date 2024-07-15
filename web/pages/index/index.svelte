<script lang="ts">
  import {onMount} from "svelte";

  import LinkButton from "@/components/link-button/link-button.svelte";
  import {getStatus, openItem} from "@/apis/mp3-scan-api";

  var itemName:string="";
  var itemFolder:string="";
  var progressNow:number=0;
  var progressMax:number=0;

  onMount(async ()=>{
    // get reviewer status and set states
    const gotStatus:Mp3ReviewStatus=await getStatus();
    itemName=gotStatus.currentItem;
    progressNow=gotStatus.currentItemIndex+1;
    progressMax=gotStatus.totalItems;
  });

  /** clicked open item button. trigger to open item */
  function h_openItemClick():void
  {
    openItem();
  }


</script>

<style lang="sass">
  @import "./index.sass"
</style>

<main>
  <div class="info">
    <p>Name: <span class="name">{itemName}</span></p>
    <p>Folder: <span class="folder">{itemFolder}</span></p>
    {#if progressNow>0 && progressMax>0}
      <p>
        Progress:
        <span class="progress1">{progressNow}</span>
        /
        <span class="progress2">{progressMax}</span>
      </p>
    {:else}
      <p>Progress:</p>
    {/if}
    <p>[=====&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</p>
  </div>

  <div class="controls">
    <div class="control-container">
      <LinkButton on:click={h_openItemClick}>- Open Item</LinkButton>
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