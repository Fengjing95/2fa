/*
 * @Date: 2023-06-28 20:35:53
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2023-06-28 22:55:21
 */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/**
 * otplib-preset-browser
 *
 * Provides fully initialised classes that are targeted
 * for a browser build.
 *
 * Uses:
 *
 * - Base32: 'plugin-base32-enc-dec'
 * - Crypto: 'plugin-crypto-js'
 */
import { createDigest, createRandomBytes } from '@otplib/plugin-crypto-js';
import { keyDecoder, keyEncoder } from '@otplib/plugin-base32-enc-dec';
import {
  Authenticator,
  AuthenticatorOptions,
  HOTP,
  HOTPOptions,
  TOTP,
  TOTPOptions
} from '@otplib/core';
import * as buffer from 'buffer'

// @ts-ignore
if (typeof window === 'object' && typeof window.Buffer === 'undefined') {
  // @ts-ignore
  window.Buffer = buffer.Buffer; /* globals buffer */
}

// @ts-ignore
if (typeof globalThis === 'object' && typeof globalThis.Buffer === 'undefined') {
  // @ts-ignore
  globalThis.Buffer = buffer.Buffer; /* globals buffer */
}

export const hotp = new HOTP<HOTPOptions>({
  createDigest
});

export const totp = new TOTP<TOTPOptions>({
  createDigest
});

export const authenticator = new Authenticator<AuthenticatorOptions>({
  createDigest,
  createRandomBytes,
  keyDecoder,
  keyEncoder
});
