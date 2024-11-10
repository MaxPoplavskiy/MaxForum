export enum UserStatus {
  ACTIVE,
  BLOCKED,
  BENEFACTOR
}

export const UserStatusToString =  {
  [UserStatus.ACTIVE]: 'ACTIVE',
  [UserStatus.BLOCKED]: 'BLOCKED',
  [UserStatus.BENEFACTOR]: 'BENEFACTOR',
}