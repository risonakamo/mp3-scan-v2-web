type ReviewDecision="yes"|"no"|"maybe"

/** status of backend */
interface Mp3ReviewStatus
{
    currentItem:string
    totalItems:number
    currentItemIndex:number
}