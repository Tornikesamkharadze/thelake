'use client';

import Image from 'next/image';
import Link from 'next/link';

const NewsDetail = ({
  title,
  date,
  heroImage, 
  excerpt, // სრული ტექსტი (რაც Grid-ზე მოკლე იყო)
  additionalImage,
  contentBottom, // string (არა array)
  backgroundColor = '#ffffff',
  contentBackgroundColor = '#f5f0e8',
  titleColor = '#000000',
  dateColor = '#999999',
  contentColor = '#000000',
  titleSize = { mobile: '24px', tablet: '32px', desktop: '40px' },
  contentSize = { mobile: '15px', tablet: '16px', desktop: '17px' },
}) => {
  const getResponsiveSize = (sizes) => {
    const sizeObj = typeof sizes === 'string' 
      ? { mobile: sizes, tablet: sizes, desktop: sizes } 
      : sizes;
    const mobile = parseFloat(sizeObj.mobile);
    const desktop = parseFloat(sizeObj.desktop);
    return `clamp(${sizeObj.mobile}, ${mobile + (desktop - mobile) * 0.5}px + 1vw, ${sizeObj.desktop})`;
  };

  return (
    <section style={{ backgroundColor }}>
      {/* 1. Hero Image */}
      {heroImage && (
        <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 
              className="text-white font-normal uppercase tracking-wide text-center px-4"
              style={{ 
                fontSize: getResponsiveSize(titleSize),
                textShadow: '2px 2px 8px rgba(0,0,0,0.7)'
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      )}

      <div className="px-4 py-12 md:py-16" style={{ backgroundColor: contentBackgroundColor }}>
        <div className="max-w-[1400px] mx-auto">
          
          {/* Breadcrumb & Date */}
          <div className="mb-8">
            <p className="text-sm md:text-base" style={{ color: dateColor }}>
              <Link href="/whats-on" className="hover:underline">
                News
              </Link>
              {' / '}
              {title}
            </p>
            {date && (
              <p className="text-xs md:text-sm mt-2" style={{ color: dateColor }}>
                {date}
              </p>
            )}
          </div>

          {/* 2. Excerpt - სრული ტექსტი */}
          {excerpt && (
            <div className="mb-8 md:mb-12">
              <p 
                className="leading-relaxed"
                style={{ 
                  color: contentColor,
                  fontSize: getResponsiveSize(contentSize)
                }}
              >
                {excerpt}
              </p>
            </div>
          )}

          {/* 3. Additional Image */}
          {additionalImage && (
            <div className="relative w-full max-w-[600px] aspect-4/3 mb-8 md:mb-12">
              <Image
                src={additionalImage}
                alt={`${title} additional`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          )}

          {/* 4. Content Bottom - დამატებითი ტექსტი */}
          {contentBottom && (
            <div>
              <p 
                className="leading-relaxed"
                style={{ 
                  color: contentColor,
                  fontSize: getResponsiveSize(contentSize)
                }}
              >
                {contentBottom}
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default NewsDetail;