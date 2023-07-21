import { Transfer as TransferEvent } from "../generated/Slp/Slp"
import { registerBurnTransaction, userManager } from "./utils/graph";
import { UserStore, filterBurn } from "./utils/user";

export function handleTransfer(event: TransferEvent): void {
  const isBurnTransaction = filterBurn(event.transaction.input);
  if(isBurnTransaction){
    const newUserStore = new UserStore(event);
    userManager(newUserStore)
    registerBurnTransaction(newUserStore);
  }
}
