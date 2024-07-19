import axios, {AxiosError, type AxiosResponse} from "axios";
import {HttpStatusCode} from "axios";

const ax=axios.create({
    baseURL:`http://${window.location.hostname}:4200`,
});

/** get status from backend */
export async function getStatus():Promise<Mp3ReviewStatus>
{
    return (await ax.get("/get-status")).data;
}

/** request to open the current item */
export async function openItem():Promise<void>
{
    return (await ax.get("/open-item")).data;
}

/** request the next item. returns status */
export async function nextItem():Promise<Mp3ReviewStatus>
{
    return (await ax.get("/next-item")).data;
}

/** request to make decision. might return string as error instead of obj */
export async function decideItem(decision:Mp3SpecialDir):Promise<Mp3ReviewStatus|string>
{
    const req:ItemDecisionRequest={
        decision
    };

    try
    {
        return (await ax.post("/decide-item",req)).data;
    }

    catch (e)
    {
        // if error, the response is probably a string and ok to return anyway
        if (e instanceof AxiosError)
        {
            return e.response?.data;
        }

        throw e;
    }
}