'use strict';

import isFunction from 'lodash/lang/isFunction';
import isNull from 'lodash/lang/isNull';

export default function bindAllClassMethods(object, methods = null, source = object) {
  let usePick = Array.isArray(methods);
  let properties = Object.getOwnPropertyNames(source);

  for (let i = 0, len = properties.length; i < len; i++) {
    let key = properties[i];

    if (usePick && methods.indexOf(key) === -1) {
      continue;
    }

    let descriptor = Object.getOwnPropertyDescriptor(source, key) || {};

    if (!descriptor.get && isFunction(object[key]) && !object.hasOwnProperty(key) && key !== 'constructor') {
      object[key] = source[key].bind(object);
    }
  }

  let nextProto = Object.getPrototypeOf(source);

  if (!isNull(nextProto) && Object.prototype !== nextProto) {
    bindAllClassMethods(object, methods, nextProto);
  }

  return object;
}