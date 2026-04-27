import Script from 'next/script';
import './globals.css';
import '../public/assets/css/vendor/bootstrap.min.css';
import '../public/assets/css/vendor/animate.min.css';
import '../public/assets/css/plugins/swiper.min.css';
import '../public/assets/css/vendor/magnific-popup.css';
import '../public/assets/css/vendor/fontawesome-pro.css';
import '../public/assets/css/vendor/spacing.css';
import '../public/assets/css/plugins/odometer-theme-default.css';
import '../public/assets/css/plugins/carouselTicker.css';
import '../public/assets/css/plugins/image-reveal-hover.css';
import '../public/assets/css/main.css';
import './custom.css';

export const metadata = {
  title: 'Dukkan Setu - Indian Shopkeepers SaaS',
  description: 'Convert your local shop into an online store in minutes. Sell through WhatsApp Commerce.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/imgs/favicon.svg" />
      </head>
      <body className="body-1">
        {children}
        <Script src="/assets/js/vendor/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/vendor/bootstrap.bundle.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/swiper.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/wow.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/meanmenu.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/nice-select.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/odometer.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/jquery.carouselTicker.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
