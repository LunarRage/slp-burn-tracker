import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { Transfer } from "../../generated/Slp/Slp";
import {SEPERATOR, BURNCODE } from "./constant";



export function filterBurn(txInput:Bytes):boolean{
    const funcHeader = changetype<Bytes>(txInput.subarray(0, 4));
    return funcHeader.equals(BURNCODE);
}

export class UserStore{
    private _event: Transfer;

    constructor(event: Transfer){
        this._event = event;
    }

    get amount(): BigInt{
        return this._event.params._value;
    }

    get txHash(): Bytes{
        return this._event.transaction.hash;
    }

    get timestamp(): BigInt{
        return this._event.block.timestamp;
    }

    get sender(): Bytes{     
        return this._event.params._from;
    }

    get burnTransactionId(): Bytes{
        return this._event.transaction.hash.concat(SEPERATOR).concat(Bytes.fromUTF8(this._event.logIndex.toString()));
    }
}
