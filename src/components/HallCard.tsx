import { Link } from 'react-router-dom';
import { MapPin, Grid3X3, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Hall } from '@/types/museum';
import { useMuseumStore } from '@/store/museumStore';
import { cn } from '@/lib/utils';

interface HallCardProps {
  hall: Hall;
  floorId: string;
  className?: string;
}

const HallCard = ({ hall, floorId, className }: HallCardProps) => {
  const visitedHalls = useMuseumStore((state) => state.visitedHalls);
  const isVisited = visitedHalls.has(hall.id);

  const progress = isVisited ? 100 : 0;

  return (
    <Link
      to={`/floor/${floorId}/hall/${hall.id}`}
      className={cn(
        'group relative block',
        'bg-white',
        'border border-stone-200 rounded-lg overflow-hidden',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-xl hover:border-amber-700/30',
        'focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:ring-offset-2',
        className
      )}
    >
      <div className="absolute top-3 right-3 z-10">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1',
            'rounded-full text-xs font-medium',
            isVisited
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-stone-100 text-stone-600 border border-stone-200'
          )}
        >
          <MapPin className="w-3 h-3" />
          {hall.roomNumber}
        </span>
      </div>

      {isVisited && (
        <div className="absolute top-3 left-3 z-10">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
      )}

      <div className="pt-10 pb-6 px-6">
        <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2 group-hover:text-amber-800 transition-colors">
          {hall.name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
          <Grid3X3 className="w-4 h-4" />
          <span>{hall.exhibitCount} 件展品</span>
        </div>

        <p className="text-stone-600 text-sm leading-relaxed font-serif line-clamp-2">
          {hall.description}
        </p>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>参观进度</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                isVisited ? 'bg-green-500' : 'bg-amber-500'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end">
          <span className="inline-flex items-center gap-1 text-amber-700 text-sm font-medium group-hover:text-amber-900 transition-colors">
            进入展厅
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HallCard;
