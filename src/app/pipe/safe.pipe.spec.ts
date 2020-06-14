/*
 * Copyright (C) 2020-2020 KevTech  - All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by KevTech <admin@kevtech.ca>, 2020-03-13, 2:05 p.m.
 *
 *  File: safe.pipe.spec.ts
 *  Project: FarmingSmarterPWA
 */

/**
 * @description This is a spec.ts used for development
 * @ignore
 * @hidden
 * @packageDocumentation
 */
import {SafePipe} from './safe.pipe';

describe('SafePipe', () => {
  it('create an instance', () => {
    // @ts-ignore
    const pipe = new SafePipe();
    expect(pipe).toBeTruthy();
  });
});
