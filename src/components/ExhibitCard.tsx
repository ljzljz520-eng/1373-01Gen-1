import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import type { Exhibit } from '@/types/museum';
import { useMuseumStore } from '@/store/museumStore';
import { cn } from '@/lib/utils';
import ImageFallback from './ImageFallback';

interface ExhibitCardProps {
  exhibit: Exhibit;
  floorId: string;
  hallId: string;
  className?: string;
}

const ExhibitCard = ({ exhibit, floorId, hallId, className }: ExhibitCardProps) => {
  const getRelatedExhibits = useMuseumStore((state) => state.getRelatedExhibits);
  const relatedExhibits = getRelatedExhibits(exhibit.relatedExhibitIds.slice(0, 3));

  return (
    <Link
      to={`/floor/${floorId}/hall/${hallId}/exhibit/${exhibit.id}`}
      className={cn(
        'group block',
        'bg-white',
        'border border-stone-200 rounded-lg overflow-hidden',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-xl hover:border-amber-700/30',
        'focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:ring-offset-2',
        className
      )}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <ImageFallback
          src={exhibit.imageUrl}
          alt={exhibit.name}
          className="aspect-[4/3] w-full"
          imgClassName="group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-serif font-semibold text-stone-800 leading-tight group-hover:text-amber-800 transition-colors">
            {exhibit.name}
          </h3>
          <span
            className={cn(
              'shrink-0 px-2.5 py-1',
              'bg-amber-50 text-amber-800',
              'text-xs font-medium',
              'rounded border border-amber-200'
            )}
          >
            <span className="sr-only">年代：</span>
            {exhibit.era}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-stone-600 mb-3">
          <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="font-serif">{exhibit.zone}</span>
        </div>

        <p className="text-stone-600 text-sm leading-relaxed mb-4 font-serif line-clamp-2">
          {exhibit.background}
        </p>

        {relatedExhibits.length > 0 && (
          <div className="pt-4 border-t border-stone-100">
            <p className="text-xs text-stone-500 mb-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              相关展品
            </p>
            <div className="flex gap-2">
              {relatedExhibits.map((rel) => (
                <div
                  key={rel.id}
                  className="w-12 h-12 rounded-md overflow-hidden border border-stone-200 bg-stone-50"
                >
                  <ImageFallback
                    src={rel.imageUrl}
                    alt={rel.name}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-end">
          <span className="inline-flex items-center gap-1 text-amber-700 text-sm font-medium group-hover:text-amber-900 transition-colors">
            查看详情
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ExhibitCard;
