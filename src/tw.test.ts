import { describe, it, expect } from 'vitest'
import tw from './tw';

describe("TW function", () => {
   it('should return empty string on nonvalid values', () => {
      expect(tw('')).toBe('');
      expect(tw({})).toBe('');
      expect(tw(true && '')).toBe('');
      expect(tw(true || '')).toBe('');
      expect(tw(true ?? '')).toBe('');
      expect(tw(false && '')).toBe('');
      expect(tw(false || '')).toBe('');
      expect(tw(false ?? '')).toBe('');
      expect(tw(null && '')).toBe('');
      expect(tw(null || '')).toBe('');
      expect(tw(null ?? '')).toBe('');
      expect(tw(undefined && '')).toBe('');
      expect(tw(undefined || '')).toBe('');
      expect(tw(undefined ?? '')).toBe('');
      expect(tw(0 && '')).toBe('');
      expect(tw(0 || '')).toBe('');
      expect(tw(0 ?? '')).toBe('');
      expect(tw(1 && '')).toBe('');
      expect(tw(1 || '')).toBe('');
      expect(tw(1 ?? '')).toBe('');
      expect(tw(1 ?? '')).toBe('');
   })

   it('should accept ternaries', () => {
      const isActive = true
      expect(tw(isActive ? '' : 'w-100%')).toBe('');
      expect(tw(isActive ? '' : 'w-100%')).toBe('');
      expect(tw(!!isActive ? '' : 'w-100%')).toBe('');
   })

   it('should accept functions', () => {
      const check = () => true
      expect(tw(check() ? '' : 'w-100%')).toBe('');
      expect(tw(!check() ? '' : 'w-100%')).toBe('w-100%');
      expect(tw(!!check() ? '' : 'w-100%')).toBe('');
   })

   it('should accept object properties notation', () => {
      const a = { a: { aa: true } }
      expect(tw(a ? '' : 'w-100%')).toBe('');
      expect(tw(!a.a ? '' : 'w-100%')).toBe('w-100%');
      expect(tw(!!a.a.aa ? '' : 'w-100%')).toBe('');
   })

   it('should return valid matches with space between them', () => {
      expect(tw('', 'a')).toBe('a');
      expect(tw('', 'a', 'b')).toBe('a b');
      expect(tw({ dark: 'h-100% w-20px' })).toBe('dark:h-100% dark:w-20px')
   })

   it('should skip invalid and falsy values', () => {
      expect(tw('', 'a')).toBe('a');
      expect(tw('a', '')).toBe('a');
      expect(tw('a', '', 'b', '', { md: '', lg: 'w-100%' })).toBe('a b lg:w-100%');
   })

   it('should add object key to the values and return a string', () => {
      expect(tw({ dark: 'h-100%' })).toBe('dark:h-100%')
      expect(tw({ dark: 'h-100% w-20px' })).toBe('dark:h-100% dark:w-20px')
      expect(tw({ dark: 'h-100% w-20px', lg: 'w-40px' })).toBe('dark:h-100% dark:w-20px lg:w-40px')
      expect(tw({ dark: { md: 'h-100% w-20px' }, lg: 'w-40px' })).toBe('dark:md:h-100% dark:md:w-20px lg:w-40px')
      expect(tw({ dark: { md: 'h-100% w-20px' }, lg: 'w-40px' }, '', 'bg-white')).toBe('dark:md:h-100% dark:md:w-20px lg:w-40px bg-white')
      expect(tw({ dark: { ["md:hover"]: 'h-100% w-20px' }, lg: 'w-40px' }, '', 'bg-white')).toBe('dark:md:hover:h-100% dark:md:hover:w-20px lg:w-40px bg-white')
   })
})