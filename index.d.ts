// Type definitions for biguint-format
// Project: biguint-format https://github.com/T-PWK/flake-idgen
// Definitions by: m-star https://github.com/mstar-kk

/// <reference types="node" />

interface FORMATS {
  dec: typeof toDecimalString;
  hex: typeof toHexString;
  bin: typeof toBinaryString;
  oct: typeof toOctetString;
}

interface formatOption {
  format: string;
  groupsize: number;
  delimiter: string;
  padstr: string;
  size: number;
}

export default function (
  buffer: Buffer,
  base: string,
  options: formatOption
): string;

export function createBuffer(size: number): Buffer;

export function createBufferFrom(object: object): Buffer;

export function toDecimalString(buffer: Buffer, options: formatOption): string;

export function toBinaryString(buffer: Buffer, options: formatOption): string;

/*
 * Converts given input (node Buffer or array of bytes) to hexadecimal string 0xDDDD where D is [0-9a-f].
 * All leading 0's are stripped out i.e. [0x00, 0x00, 0x00, 0x01] -> '0x1'
 */
export function toHexString(buffer: Buffer, options: formatOption): string;

export function toOctetString(buffer: Buffer, options: formatOption): string;
