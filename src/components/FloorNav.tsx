import { Link, useParams } from 'react-router-dom';
import { Layers, Building2 } from 'lucide-react';
import { useMuseumStore } from '@/store/museumStore';
import { cn } from '@/lib/utils';

interface FloorNavProps {
  className?: string;
}

const FloorNav = ({ className }: FloorNavProps) => {
  const floors = useMuseumStore((state) => state.floors);
  const params = useParams();
  const currentFloorId = params.floorId;

  const sortedFloors = [...floors].sort((a, b) => b.number - a.number);

  return (
    <nav aria-label="楼层导航" className={className}>
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-5 h-5 text-amber-700" />
        <h2 className="text-lg font-serif font-semibold text-stone-800">楼层导览</h2>
      </div>

      <ul className="space-y-2">
        {sortedFloors.map((floor) => {
          const isActive = currentFloorId === floor.id;
          const totalExhibits = floor.halls.reduce(
            (sum, hall) => sum + hall.exhibitCount,
            0
          );

          return (
            <li key={floor.id}>
              <Link
                to={`/floor/${floor.id}`}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg',
                  'transition-all duration-200',
                  'border',
                  isActive
                    ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-md'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 hover:-translate-y-0.5'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                    'font-serif text-lg font-bold',
                    isActive
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-100 text-stone-600'
                  )}
                >
                  {floor.number > 0 ? `${floor.number}F` : 'B1'}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      'font-serif font-medium truncate',
                      isActive ? 'text-amber-900' : 'text-stone-800'
                    )}
                  >
                    {floor.name}
                  </p>
                  <p className="text-xs text-stone-500 truncate">
                    {floor.halls.length} 个展厅 · {totalExhibits} 件展品
                  </p>
                </div>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 p-4 bg-stone-50 rounded-lg border border-stone-200">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-amber-700" />
          <span className="text-sm font-medium text-stone-700">推荐参观路线</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          建议从第一层开始，依次向上参观，最后到地下一层。全程约需 2-3 小时。
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {sortedFloors
            .sort((a, b) => a.number - b.number)
            .map((floor) => (
              <span
                key={floor.id}
                className="inline-flex items-center px-2 py-0.5 bg-white border border-stone-200 rounded text-xs text-stone-600"
              >
                {floor.number > 0 ? `${floor.number}F` : 'B1'}
              </span>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default FloorNav;
