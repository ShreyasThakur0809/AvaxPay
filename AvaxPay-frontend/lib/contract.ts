import { Abi } from 'viem';
import { getContracts } from './contracts';

/**
 * AvaxPay Processor Contract ABI
 */
export const AVAXPAY_PROCESSOR_ABI = [
  {
    inputs: [
      { internalType: 'address payable', name: 'to', type: 'address' },
      { internalType: 'string', name: 'label', type: 'string' },
      { internalType: 'string', name: 'memo', type: 'string' },
    ],
    name: 'processPayment',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'string', name: 'label', type: 'string' },
      { internalType: 'string', name: 'memo', type: 'string' },
    ],
    name: 'processTokenPayment',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'paymentId', type: 'bytes32' }],
    name: 'getPaymentDetails',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'string', name: 'label', type: 'string' },
          { internalType: 'string', name: 'memo', type: 'string' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          { internalType: 'bool', name: 'processed', type: 'bool' },
        ],
        internalType: 'struct AvaxPayProcessor.Payment',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feePercentage',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'paymentId', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'string', name: 'label', type: 'string' },
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'PaymentProcessed',
    type: 'event',
  },
] as const;

export const AVAXPAY_PROCESSOR_ABI_TYPED: Abi = AVAXPAY_PROCESSOR_ABI;

/**
 * Get processor contract address for current chain
 */
export function getProcessorAddress(chainId: number = 43113): `0x${string}` {
  const contracts = getContracts(chainId);
  return contracts.processor as `0x${string}`;
}

/**
 * Get subscription manager contract address for current chain
 */
export function getSubscriptionManagerAddress(chainId: number = 43113): `0x${string}` {
  const contracts = getContracts(chainId);
  return contracts.subscriptionManager as `0x${string}`;
}

// Export for backwards compatibility
export const CONTRACT_ADDRESSES = {
  processor: getProcessorAddress(),
} as const;
