/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 3/16/20, 5:03 AM
 * File: safe.pipe.ts
 * Project: ss.pxl.plus
 */

/**
 * @module Pipes
 * @packageDocumentation
 */
import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})

/**
 * @description Used to verify the security of content
 * @param sanitizer  - Declares Domsanitizer service for use
 *
 * @implements PipeTransform
 */
export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}

  /**
   * @description Allows certain resouse types to be trusted
   * @param value - Unsafe data that is being passed in
   * @param type - Type of data
   *
   */
  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
