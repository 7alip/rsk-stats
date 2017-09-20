import Vue from 'vue'
import { isDigits } from './NumberFilters.js'

export const nodeType = Vue.filter('node-type', (text) => {
  if (text) return text.replace(/\//g, ' ')
})

export const yesNo = Vue.filter('yes-no', (value) => {
  return (value) ? 'yes' : 'no'
})

export const hashTrim = Vue.filter('hash-trim', (value, len) => {
  len = len || 8
  return value.slice(0, len) + '...' + value.slice(-len)
})

export const msSuffix = Vue.filter('ms-suffix', (value) => {
  if (!isDigits(value)) return value
  return value + 'ms'
})
