<script lang="ts">
  import {onMount} from "svelte";

  import LinkButton from "@/components/link-button/link-button.svelte";
  import ProgressBar from "@/components/progress-bar/progress-bar.svelte";
  import {decideItem, getStatus, openItem} from "@/apis/mp3-scan-api";



  // --- consts
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



  // --- states
  // info zone display values
  var itemName:string="";
  var itemFolder:string="";

  // progress counter values
  var progressNow:number=0;
  var progressMax:number=0;

  // the currently selected decision
  var currentDecision:Mp3SpecialDir|undefined=undefined;

  // displays error text in error text field
  var errorText:string="";

  // when set, locks down all buttons and displays no more items
  var allDone:boolean=false;

  // state of the decision buttons
  var decisionItems2:DecisionItem2[]=[];



  // --- construction
  onMount(async ()=>{
    // get reviewer status and set states
    const gotStatus:Mp3ReviewStatus=await getStatus();

    updateStatus(gotStatus);
  });



  // --- state control
  /** update the state vars given a new status obj. if the item successfully changed, resets the
   *  current decision and error text */
  function updateStatus(newstatus:Mp3ReviewStatus):void
  {
    // special setting when no more items
    if (newstatus.noMoreItems)
    {
      allDone=true;
      progressNow=newstatus.totalItems;
      progressMax=newstatus.totalItems;
      errorText="";
      currentDecision=undefined;
      return;
    }

    if (itemName!=newstatus.currentItem)
    {
      currentDecision=undefined;
      errorText="";
    }

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

    const newStatus:Mp3ReviewStatus|string=await decideItem(currentDecision);

    // if new status is string, it is an error code to be displayed. display the error code
    if (typeof newStatus=="string")
    {
      errorText=`!! ${newStatus} !!`;
    }

    else
    {
      // todo: risky, assumes if not string then it is the correct shape. do more detections
      updateStatus(newStatus);
    }

  }


  // --- reactives
  // render decision items 2 array
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
        },
        disabled:allDone
      };
    });
  }
</script>

<style lang="sass">
  @import "./index.sass"
</style>

<main>
  <div class="info">
    {#if !allDone}
      <p>Name: <span class="name">{itemName}</span></p>
      <p>Folder: <span class="folder">{itemFolder}</span></p>
    {:else}
      <p>No More Items</p>
    {/if}
    <p>
      Progress:
      <span class="progress1">{progressNow}</span>
      /
      <span class="progress2">{progressMax}</span>
    </p>
    <ProgressBar currentVal={progressNow} maxVal={progressMax} numChars={30}/>
    <p><span class="error">{errorText}</span>&nbsp</p>
  </div>

  <div class="controls">
    <div class="control-container">
      <LinkButton on:click={h_openItemClick} disabled={allDone}>- Open Item</LinkButton>
    </div>

    <div class="control-container">
      <LinkButton disabled={currentDecision==undefined || allDone} on:click={h_nextButtonClick}>
        - Next Item
      </LinkButton>
    </div>

    <div class="control-container">
      <h2>Decision:</h2>
      {#each decisionItems2 as item (item.decision)}
        <LinkButton indented selected={item.selected} on:click={item.onClick}
          disabled={item.disabled}
        >
          {item.displayText}
        </LinkButton>
      {/each}
    </div>
  </div>
</main>