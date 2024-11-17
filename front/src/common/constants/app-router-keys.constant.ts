export const RouterKey = {
  ROOT: '/',
  ACCOUNT: '/account',
  ALL: '*',
  NOT_FOUND: '/not-found',
  ACCOUNT_MODERATION: '/account-moderation',
  BENEFACTOR_REQUEST: '/benefactor-request',
  MODERATE_BENEFACTOR_REQUEST: '/moderate-benefactor-request',
  FUNDRAISING: {
    INDEX: '/fundraisers',
    MY_FUNDRAISERS: 'my-fundraisers',
    ID: ':fundraiserAddress',
    CREATE: "create"
  }
}