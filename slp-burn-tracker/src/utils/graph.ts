import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { BurnTransaction as BurnTransactionEntity, Statistic as StatisticsEntity, User, User as UserEntity } from "../../generated/schema";
import { UserStore } from "./user";
import { STATISTICKEY } from "./constant";


// ##################################################################### //
// ######################### Utility Functions ######################### //
// ##################################################################### //
export function loadUser(id:Bytes):UserEntity | null{
    const potentialUser = User.load(id);
    return potentialUser;
}

export function loadStatistics(id:Bytes):StatisticsEntity | null{
    const potentialStatistics = StatisticsEntity.load(id);
    return potentialStatistics;
}

export function loadBurnTransaction(id:Bytes): BurnTransactionEntity |null{
    const potentialBurnTransaction = BurnTransactionEntity.load(id);
    return potentialBurnTransaction;
}

export function createNewUser(id: Bytes, startingBal:BigInt):UserEntity{
    const newUser = new User(id);
    newUser.balance = startingBal;
    return newUser;
}

export function createNewStatistics(id:Bytes):StatisticsEntity{
    const newStatistics = new StatisticsEntity(id);
    newStatistics.totalBurned = BigInt.fromI32(0);
    newStatistics.totalUsers = BigInt.fromI32(0);
    newStatistics.totalTransactions = BigInt.fromI32(0);
    return newStatistics;
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

export function increaseTotalUsers(statistics:StatisticsEntity):StatisticsEntity{
    statistics.totalUsers = statistics.totalUsers.plus(BigInt.fromI32(1));
    return statistics;
}

export function increaseTotalTransaction(statistics:StatisticsEntity):StatisticsEntity{
    statistics.totalTransactions = statistics.totalTransactions.plus(BigInt.fromI32(1));
    return statistics;
}

export function increaseTotalBurned(statistics:StatisticsEntity, amount:BigInt):StatisticsEntity{
    statistics.totalBurned = statistics.totalBurned.plus(amount);
    return statistics;
}

export function saveUser(user:UserEntity):void{
    user.save();
}
export function saveStatistics(statistics:StatisticsEntity):void{
    statistics.save();
}
export function saveBurnTransaction(transaction:BurnTransactionEntity):void{
    transaction.save();
}

// ====================================================== //
// =============== Higher Level Functions =============== //
// ====================================================== //

export function findStatistics():boolean{
    return !!loadStatistics(STATISTICKEY);
}

export function registerUser(userStore:UserStore):UserEntity | null{
    const potentialUser = loadUser(userStore.sender);
   
    if(potentialUser){
        return null;
    }

    const newUser = createNewUser(userStore.sender,userStore.amount);
    log.info("New User Created: {}", [userStore.sender.toHexString()]);
    saveUser(newUser);
    return newUser;
}

export function registerStatistics():StatisticsEntity | null{
    const potentialStatistics = loadStatistics(STATISTICKEY);

    if(potentialStatistics){
        return null;
    }

    const newStatistics = createNewStatistics(STATISTICKEY);
    saveStatistics(newStatistics);
    return newStatistics;
}

export function findUser(userStore:UserStore):boolean{
    const potentialUser = loadUser(userStore.sender);

    if(potentialUser){
        return false;
    }
    return true;
}

export function statisticsUpdate(userStore:UserStore):boolean{
    const potentialStatistics = loadStatistics(STATISTICKEY);

    if(potentialStatistics){
        increaseTotalBurned(potentialStatistics,userStore.amount);
        increaseTotalTransaction(potentialStatistics);
        const isNewUser = findUser(userStore);
        if(isNewUser){
            increaseTotalUsers(potentialStatistics);
        }
        saveStatistics(potentialStatistics);
        return true;
    }

    log.critical("Statistics Entity not found", []);
    return false;
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

    if(!potentialUser){
        const newUser = loadUser(userStore.sender);
        if(newUser){
            log.info("Updating User Balance: {}", [userStore.sender.toHexString()]);
            updateUserBalance(newUser, userStore);
        }
        
    }
}

export function updateUserBalance(user:UserEntity,userStore:UserStore):UserEntity | null{
    const updatedUser = increaseBalance(user, userStore.amount);
    log.info("User Balance Updated: {}", [userStore.sender.toHexString()]);
    saveUser(updatedUser);
    return updatedUser;
}