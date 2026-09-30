import createMiddleware from 'next-intl/middleware';
import { defaultLocale } from './i18n'; 

export default createMiddleware({
  locales: ['en', 'ka'],
  defaultLocale: defaultLocale, 
  localePrefix: 'always',
  // hreflang is emitted once, in the HTML <head> (generateMetadata) — no duplicate Link headers
  alternateLinks: false
});

export const config = {
  matcher: ['/', '/(ka|en)/:path*']
};