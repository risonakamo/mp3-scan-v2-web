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

  var errorText:string="";

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
    <p><span class="error">{errorText}</span>&nbsp</p>
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