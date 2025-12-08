'use client';

import Image from 'next/image';
import Link from 'next/link';

const NewsCard = ({
  slug,
  image,
  title,
  date,
  excerpt,
  textBoxColor = '#e8dfd0',
  titleColor = '#000000',
  dateColor = '#999999',
  excerptColor = '#000000',
  linkText = 'Read More',
  linkColor = '#d4745a',
}) => {
  if (!image) return null;

  return (
    <Link href={`/whats-on/${slug}`} className="block group">
      {/* Wrapper - relative */}
      <div className="relative flex items-center">
        
        {/* ფოტო - მარჯვნივ */}
        <div className="relative w-full aspect-4/3 overflow-hidden ml-[10%]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* ტექსტ ბოქსი - absolute, მარცხნივ, ვერტიკალურად შუაში */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[50%] md:w-[45%] p-4 md:p-6 z-10"
          style={{ backgroundColor: textBoxColor }}
        >
          {/* სათაური */}
          <h3 
            className="text-base md:text-lg font-normal mb-2 uppercase tracking-wide"
            style={{ color: titleColor }}
          >
            {title}
          </h3>
          
          {/* თარიღი */}
          <p 
            className="text-xs mb-2"
            style={{ color: dateColor }}
          >
            {date}
          </p>
          
          {/* ამონარიდი - მოკლე ვერსია Grid-ზე */}
          <p 
            className="text-xs md:text-sm leading-relaxed mb-3 line-clamp-3"
            style={{ color: excerptColor }}
          >
            {excerpt.substring(0, 150)}...
          </p>
          
          {/* Read More ლინკი */}
          <span 
            className="text-xs md:text-sm font-normal hover:underline"
            style={{ color: linkColor }}
          >
            {linkText}
          </span>
        </div>
        
      </div>
    </Link>
  );
};

const NewsGrid = ({
  newsItems = [],
  backgroundColor = '#ffffff',
  gridGap = '2rem',
}) => {
  return (
    <section 
      className="relative py-16 md:py-24"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
          style={{ gap: gridGap }}
        >
          {newsItems.map((item, index) => (
            <NewsCard
              key={item.slug || index}
              slug={item.slug}
              image={item.image}
              title={item.title}
              date={item.date}
              excerpt={item.excerpt}
              textBoxColor={item.textBoxColor}
              titleColor={item.titleColor}
              dateColor={item.dateColor}
              excerptColor={item.excerptColor}
              linkText={item.linkText}
              linkColor={item.linkColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;