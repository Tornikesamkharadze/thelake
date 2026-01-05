import localFont from 'next/font/local'
import "./globals.css";

const tbcContractica = localFont({
  src: [
    {
      path: '../public/fonts/TBCContractica-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContractica-Book.ttf',
      weight: '350',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContractica-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContractica-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContractica-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContractica-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-contractica',
})

const tbcContracticaCaps = localFont({
  src: [
    {
      path: '../public/fonts/TBCContracticaCAPS-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContracticaCAPS-Book.ttf',
      weight: '350',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContracticaCAPS-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContracticaCAPS-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContracticaCAPS-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/TBCContracticaCAPS-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-contractica-caps',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${tbcContractica.variable} ${tbcContracticaCaps.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}