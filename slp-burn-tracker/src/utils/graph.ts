import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { BurnTransaction as BurnTransactionEntity, User, User as UserEntity } from "../../generated/schema";
import { UserStore } from "./user";


// ##################################################################### //
// ######################### Utility Functions ######################### //
// ##################################################################### //
export function loadUser(id:Bytes):UserEntity | null{
    const potentialUser = User.load(id);
    return potentialUser;
}

export function loadBurnTransaction(id:Bytes): BurnTransactionEntity |null{
    const potentialBurnTransaction = BurnTransactionEntity.load(id);
    return potentialBurnTransaction;
}

export function createNewUser(id: Bytes):UserEntity{
    const newUser = new User(id);
    newUser.balance = BigInt.fromI32(0);
    return newUser;
}

export function createNewBurnTransaction(id: Bytes, txHash:Bytes, timestamp:BigInt, amount:BigInt, sender:Bytes):BurnTransactionEntity{
    const newBurnTransaction = new BurnTransactionEntity(id);
    newBurnTransaction.amount = amount;
    newBurnTransaction.timestamp = timestamp;
    newBurnTransaction.txHash = txHash;
    newBurnTransaction.sender = sender;
    return newBurnTransaction;
}

export function increaseBalance(user:UserEntity, amount:BigInt):UserEntity{
    user.balance = user.balance.plus(amount);
    return user;
}

export function saveUser(user:UserEntity):void{
    user.save();
}

export function saveBurnTransaction(transaction:BurnTransactionEntity):void{
    transaction.save();
}

// ====================================================== //
// =============== Higher Level Functions =============== //
// ====================================================== //

export function registerUser(userStore:UserStore):UserEntity | null{
    const potentialUser = loadUser(userStore.sender);
   
    if(potentialUser){
        return null
    }

    const newUser = createNewUser(userStore.sender);
    log.info("New User Created: {}", [userStore.sender.toHexString()]);
    saveUser(newUser);
    return newUser;
}

export function registerBurnTransaction(userStore:UserStore):BurnTransactionEntity | null{
    const potentialBurnTransaction = loadBurnTransaction(userStore.burnTransactionId);

    if(potentialBurnTransaction){
        return null;
    }

    const newBurnTransaction = createNewBurnTransaction(userStore.burnTransactionId, userStore.txHash, userStore.timestamp, userStore.amount, userStore.sender);
    log.info("New Burn Transaction Created: {}", [userStore.burnTransactionId.toHexString()]);
    saveBurnTransaction(newBurnTransaction);
    return newBurnTransaction;
}

export function userManager(userStore:UserStore):void{
    const potentialUser = registerUser(userStore);

    if(potentialUser){
        updateUserBalance(potentialUser, userStore);
    }
}

export function updateUserBalance(user:UserEntity,userStore:UserStore):UserEntity | null{
    const updatedUser = increaseBalance(user, userStore.amount);
    log.info("User Balance Updated: {}", [userStore.sender.toHexString()]);
    saveUser(updatedUser);
    return updatedUser;
}