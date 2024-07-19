type Mp3SpecialDir="yes"|"no"|"maybe"

/** status of backend */
interface Mp3ReviewStatus
{
    currentItem:string
    currentItemFolder:string

    totalItems:number
    currentItemIndex:number

    noMoreItems:boolean
}

/** request to make decision */
interface ItemDecisionRequest
{
    decision:Mp3SpecialDir
}