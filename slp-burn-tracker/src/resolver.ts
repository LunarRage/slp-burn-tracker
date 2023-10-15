import { log } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/Slp/Slp"
import { findStatistics, registerBurnTransaction, registerStatistics, statisticsUpdate, userManager } from "./utils/graph";
import { UserStore, filterBurn } from "./utils/user";

export function handleTransfer(event: TransferEvent): void {

  const isBurnTransaction = filterBurn(event.transaction.input); 

  if (isBurnTransaction) {
    if (!findStatistics()) {
      registerStatistics();
    }
    const newUserStore = new UserStore(event);
    if (statisticsUpdate(newUserStore)) {
      userManager(newUserStore);
      registerBurnTransaction(newUserStore);
    }
  }
}
