import { Abi } from "viem";

export const AdministrationAbi: Abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getBenefactorRequestsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "administrator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "blockUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "unblockUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "giveBenefactor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userStatus",
    outputs: [
      {
        internalType: "enum Administration.UserStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "giveBenefactorToLast",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_reason",
        type: "string",
      },
    ],
    name: "declineBenefactorToLast",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_comment",
        type: "string",
      },
    ],
    name: "createBenefactorRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBenefactorRequest",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
          {
            internalType: "string",
            name: "declineReason",
            type: "string",
          },
          {
            internalType: "enum BenefactorRequestStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        internalType: "struct BenefactorRequest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isBenefactorRequestSent",
    outputs: [
      {
        internalType: "string",
        name: "comment",
        type: "string",
      },
      {
        internalType: "string",
        name: "declineReason",
        type: "string",
      },
      {
        internalType: "enum BenefactorRequestStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "GiveBenefactor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "DeclineBenefactor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "comment",
        type: "string",
      },
    ],
    name: "CreateBenefactorRequest",
    type: "event",
  },
];
