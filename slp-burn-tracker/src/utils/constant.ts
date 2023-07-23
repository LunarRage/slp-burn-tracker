import { BigInt, Bytes } from "@graphprotocol/graph-ts"

const BURNCODE = "0x42966c68";
export const STARTBLOCK = BigInt.fromString("13129650");
export const STATISTICKEY = Bytes.fromUTF8("SubgraphStatistics");
export const SEPERATOR = Bytes.fromUTF8(":");
export const BURN_H: Set<string> = initBurnTransferHashSet();

function initBurnTransferHashSet(): Set<string> {
    const burnTransferHashSet = new Set<string>();
    burnTransferHashSet.add(BURNCODE);
    return burnTransferHashSet;
}