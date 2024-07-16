type ReviewDecision="yes"|"no"|"maybe"

/** status of backend */
interface Mp3ReviewStatus
{
    currentItem:string
    currentItemFolder:string
    totalItems:number
    currentItemIndex:number
}

/** request to make decision */
interface ItemDecisionRequest
{
    decision:ReviewDecision
}