import createMiddleware from 'next-intl/middleware';
import { defaultLocale } from './i18n'; 

export default createMiddleware({
  locales: ['en', 'ka'],
  defaultLocale: defaultLocale, 
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(ka|en)/:path*']
};