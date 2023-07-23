import { log } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/Slp/Slp"
import { findStatistics, registerBurnTransaction, registerStatistics, statisticsUpdate, userManager } from "./utils/graph";
import { UserStore, filterBurn } from "./utils/user";

export function handleTransfer(event: TransferEvent): void {
  const isStatisticsInitialized = findStatistics();
  if(!isStatisticsInitialized){
    registerStatistics();
  }
  const isBurnTransaction = filterBurn(event.transaction.input); 

  if(isBurnTransaction){
    const newUserStore = new UserStore(event);
    const isStatsUpdated = statisticsUpdate(newUserStore);

    if(isStatsUpdated){
      userManager(newUserStore)
      registerBurnTransaction(newUserStore);
    }
    
  }
}
