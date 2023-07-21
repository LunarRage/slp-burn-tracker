import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  AdminRemoved,
  Approval,
  BreedingPotionCheckpoint,
  MinterAdded,
  MinterRemoved,
  Paused,
  SpenderUnwhitelisted,
  SpenderWhitelisted,
  Transfer,
  Unpaused
} from "../generated/Slp/Slp"

export function createAdminChangedEvent(
  _oldAdmin: Address,
  _newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam("_oldAdmin", ethereum.Value.fromAddress(_oldAdmin))
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("_newAdmin", ethereum.Value.fromAddress(_newAdmin))
  )

  return adminChangedEvent
}

export function createAdminRemovedEvent(_oldAdmin: Address): AdminRemoved {
  let adminRemovedEvent = changetype<AdminRemoved>(newMockEvent())

  adminRemovedEvent.parameters = new Array()

  adminRemovedEvent.parameters.push(
    new ethereum.EventParam("_oldAdmin", ethereum.Value.fromAddress(_oldAdmin))
  )

  return adminRemovedEvent
}

export function createApprovalEvent(
  _owner: Address,
  _spender: Address,
  _value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("_spender", ethereum.Value.fromAddress(_spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return approvalEvent
}

export function createBreedingPotionCheckpointEvent(
  _owner: Address,
  _amount: BigInt
): BreedingPotionCheckpoint {
  let breedingPotionCheckpointEvent = changetype<BreedingPotionCheckpoint>(
    newMockEvent()
  )

  breedingPotionCheckpointEvent.parameters = new Array()

  breedingPotionCheckpointEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  breedingPotionCheckpointEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return breedingPotionCheckpointEvent
}

export function createMinterAddedEvent(_minter: Address): MinterAdded {
  let minterAddedEvent = changetype<MinterAdded>(newMockEvent())

  minterAddedEvent.parameters = new Array()

  minterAddedEvent.parameters.push(
    new ethereum.EventParam("_minter", ethereum.Value.fromAddress(_minter))
  )

  return minterAddedEvent
}

export function createMinterRemovedEvent(_minter: Address): MinterRemoved {
  let minterRemovedEvent = changetype<MinterRemoved>(newMockEvent())

  minterRemovedEvent.parameters = new Array()

  minterRemovedEvent.parameters.push(
    new ethereum.EventParam("_minter", ethereum.Value.fromAddress(_minter))
  )

  return minterRemovedEvent
}

export function createPausedEvent(): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  return pausedEvent
}

export function createSpenderUnwhitelistedEvent(
  _spender: Address
): SpenderUnwhitelisted {
  let spenderUnwhitelistedEvent = changetype<SpenderUnwhitelisted>(
    newMockEvent()
  )

  spenderUnwhitelistedEvent.parameters = new Array()

  spenderUnwhitelistedEvent.parameters.push(
    new ethereum.EventParam("_spender", ethereum.Value.fromAddress(_spender))
  )

  return spenderUnwhitelistedEvent
}

export function createSpenderWhitelistedEvent(
  _spender: Address
): SpenderWhitelisted {
  let spenderWhitelistedEvent = changetype<SpenderWhitelisted>(newMockEvent())

  spenderWhitelistedEvent.parameters = new Array()

  spenderWhitelistedEvent.parameters.push(
    new ethereum.EventParam("_spender", ethereum.Value.fromAddress(_spender))
  )

  return spenderWhitelistedEvent
}

export function createTransferEvent(
  _from: Address,
  _to: Address,
  _value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return transferEvent
}

export function createUnpausedEvent(): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  return unpausedEvent
}
