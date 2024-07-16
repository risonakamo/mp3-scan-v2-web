<script lang="ts">
  import {onMount} from "svelte";


  import LinkButton from "@/components/link-button/link-button.svelte";
  import {decideItem, getStatus, openItem} from "@/apis/mp3-scan-api";

  // --- states
  var itemName:string="";
  var itemFolder:string="";
  var progressNow:number=0;
  var progressMax:number=0;

  var currentDecision:ReviewDecision|undefined=undefined;

  const decisionItems:DecisionItem[]=[
    {
      decision:"yes",
      displayText:"YES"
    },
    {
      decision:"no",
      displayText:"NO",
    },
    {
      decision:"maybe",
      displayText:"MAYBE"
    }
  ];

  var decisionItems2:DecisionItem2[]=[];


  // --- construction
  onMount(async ()=>{
    // get reviewer status and set states
    const gotStatus:Mp3ReviewStatus=await getStatus();

    updateStatus(gotStatus);
  });



  // --- state control
  /** update the state vars given a new status obj */
  function updateStatus(newstatus:Mp3ReviewStatus):void
  {
    itemName=newstatus.currentItem;
    itemFolder=newstatus.currentItemFolder,
    progressNow=newstatus.currentItemIndex+1;
    progressMax=newstatus.totalItems;
  }


  // --- handlers
  /** clicked open item button. trigger to open item */
  function h_openItemClick():void
  {
    openItem();
  }

  /** clicked next button. send the decision */
  async function h_nextButtonClick():Promise<void>
  {
    if (!currentDecision)
    {
      return;
    }

    const newStatus:Mp3ReviewStatus=await decideItem(currentDecision);

    updateStatus(newStatus);
  }


  // --- effects
  // decision items array update
  $: {
    decisionItems2=decisionItems.map((item:DecisionItem):DecisionItem2=>{
      var displayText:string=`- ${item.displayText}`;
      const selected:boolean=item.decision==currentDecision;

      if (selected)
      {
        displayText=`* ${item.displayText}`;
      }

      return {
        decision:item.decision,
        displayText,
        selected,
        onClick():void
        {
          currentDecision=item.decision;
        }
      };
    });
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
      <LinkButton disabled={currentDecision==undefined} on:click={h_nextButtonClick}>
        - Next Item
      </LinkButton>
    </div>

    <div class="control-container">
      <h2>Decision:</h2>
      {#each decisionItems2 as item}
        <LinkButton indented selected={item.selected} on:click={item.onClick}>
          {item.displayText}
        </LinkButton>
      {/each}
    </div>
  </div>
</main>