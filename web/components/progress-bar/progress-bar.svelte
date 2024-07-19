<script lang="ts">
  // the min val
  export var currentVal:number=0;
  // the total val
  export var maxVal:number=0;
  // number of characters to make up the progress bar
  export var numChars:number=17;


  // --- derived
  // 2nd current val used for rendering. always clamped to be equal or below max val,
  // and not negative.
  var currentVal2:number=currentVal;
  $: {
    currentVal2=currentVal;

    if (currentVal2>maxVal)
    {
      currentVal2=maxVal;
    }

    else if (currentVal2<0)
    {
      currentVal2=0;
    }
  }

  // text that forms the progess bar. constructed based on the other states
  var progressBarText:string="";
  $: {
    let newProgressBarText:string="";
    const numberMarks:number=Math.round((currentVal2/maxVal)*numChars);

    for (let i=0;i<numberMarks;i++)
    {
      newProgressBarText+="=";
    }

    for (let i=0;i<numChars-numberMarks;i++)
    {
      newProgressBarText+="\xa0";
    }

    progressBarText=newProgressBarText;
  }
</script>

<p>[{progressBarText}]</p>