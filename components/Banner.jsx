'use client';

export default function Banner({ store, title, subtitle, description }) {
  const getCategoryContent = () => {
    switch (store.category) {
      case 'Kirana Store':
      case 'Supermarket':
        return {
          suffix: 'Delivered To Your Door.',
          desc: 'Get fresh groceries, dairy, and daily essentials delivered fast from your trusted neighborhood mart.',
          bg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop'
        };
      case 'Pharmacy':
        return {
          suffix: 'Your Health, Our Priority.',
          desc: 'Genuine medicines, health supplements, and wellness products available at your convenient local pharmacy.',
          bg: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1920&auto=format&fit=crop'
        };
      case 'Electronics':
        return {
          suffix: 'The Future of Tech.',
          desc: 'Explore the latest gadgets, accessories, and smart electronics from the global technology leaders.',
          bg: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1920&auto=format&fit=crop'
        };
      case 'Fashion':
        return {
          suffix: 'Style Reimagined.',
          desc: 'Discover premuim apparel, boutique collections, and the latest trends from your favorite local stylist.',
          bg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&auto=format&fit=crop'
        };
      default:
        return {
          suffix: `The Best ${store.category || 'Products'} in Town.`,
          desc: `Order high-quality ${store.category?.toLowerCase() || 'premium'} products directly from your favorite local shop.`,
          bg: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1920&auto=format&fit=crop'
        };
    }
  };

  const content = getCategoryContent();
  const displayTitle = title || <>{store.name} <br /> {content.suffix}</>;
  const displaySubtitle = subtitle || `Welcome to ${store.name}`;
  const displayDescription = description || content.desc;
  const bannerBg = store.bannerImage || content.bg;

  return (
    <section className="banner overflow-hidden">
        <div className="swiper banner__slider">
            <div className="swiper-wrapper">
                {/* Slide 1 */}
                <div className="swiper-slide">
                    <div className="banner__item theme-bg-heading-primary" style={{padding: '180px 0 150px 0', minHeight: '800px', display: 'flex', alignItems: 'center'}}>
                        <div className="banner__item-bg" style={{backgroundImage: `url('${bannerBg}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6}}></div>
                        <div className="container" style={{zIndex: 2, position: 'relative'}}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="banner__item-content">
                                        {/* Issue #4 Fix: High Contrast Subheading */}
                                        <h4 className="banner__item-sub-title mb-25" style={{display: 'inline-block'}}>
                                            <span style={{backgroundColor: '#2E7D32', color: 'white', padding: '8px 20px', borderRadius: '50px', fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px'}}>
                                                {displaySubtitle}
                                            </span>
                                        </h4>
                                        {/* Issue #5 Fix: Line-height and padding for Hero text */}
                                        <h1 className="banner__item-title h1-70 rr-fw-bold color-white mb-20" style={{lineHeight: '1.2', textShadow: '2px 2px 10px rgba(0,0,0,0.5)'}}>
                                            {displayTitle}
                                        </h1>
                                        <p className="des color-white mb-40" style={{fontSize: '22px', maxWidth: '700px', lineHeight: '1.6', opacity: 0.9}}>
                                            {displayDescription}
                                        </p>
                                        <div className="banner__item-content-link d-flex align-items-center flex-wrap">
                                            <a href="#products" className="rr-btn" style={{backgroundColor: '#2E7D32', padding: '15px 35px', borderRadius: '5px', color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>
                                                Shop Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional slides follow the same layout for consistency */}
                <div className="swiper-slide">
                    <div className="banner__item theme-bg-heading-primary" style={{padding: '180px 0 150px 0', minHeight: '800px', display: 'flex', alignItems: 'center'}}>
                        <div className="banner__item-bg" style={{backgroundImage: `url('${store.bannerImage || '/images/gallery-3.png'}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6}}></div>
                        <div className="container" style={{zIndex: 2, position: 'relative'}}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="banner__item-content">
                                        <h4 className="banner__item-sub-title mb-25" style={{display: 'inline-block'}}>
                                            <span style={{backgroundColor: '#2E7D32', color: 'white', padding: '8px 20px', borderRadius: '50px', fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px'}}>
                                                Quality Assured
                                            </span>
                                        </h4>
                                        <h1 className="banner__item-title h1-70 rr-fw-bold color-white mb-20" style={{lineHeight: '1.2', textShadow: '2px 2px 10px rgba(0,0,0,0.5)'}}>
                                            Premium Products <br /> At Local Prices.
                                        </h1>
                                        <p className="des color-white mb-40" style={{fontSize: '22px', maxWidth: '700px', lineHeight: '1.6', opacity: 0.9}}>
                                            We source directly from farms to ensure you get the best <br /> nutrition for your family every single day.
                                        </p>
                                        <div className="banner__item-content-link d-flex align-items-center flex-wrap">
                                            <a href="#products" className="rr-btn" style={{backgroundColor: '#2E7D32', padding: '15px 35px', borderRadius: '5px', color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>
                                                Browse Catalog
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
