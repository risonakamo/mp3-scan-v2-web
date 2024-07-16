// ytpes for stuff in pages

/** config for decision list elements */
interface DecisionItem
{
    decision:ReviewDecision
    displayText:string
}

/** actual objs for rendering list */
interface DecisionItem2 extends DecisionItem
{
    onClick():void
    selected:boolean
}