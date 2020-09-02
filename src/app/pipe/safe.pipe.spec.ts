/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 3/13/20, 10:52 PM
 * File: safe.pipe.spec.ts
 * Project: ss.pxl.plus
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
