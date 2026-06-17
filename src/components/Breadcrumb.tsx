import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useMuseumStore } from '@/store/museumStore';
import { cn } from '@/lib/utils';

const Breadcrumb = () => {
  const params = useParams();
  const { floorId, hallId, exhibitId } = params;
  const generateBreadcrumbs = useMuseumStore((state) => state.generateBreadcrumbs);

  const crumbs = generateBreadcrumbs(floorId, hallId, exhibitId);

  return (
    <nav aria-label="面包屑导航" className="w-full">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-1 text-amber-700/50" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  className={cn(
                    'font-medium',
                    'text-stone-800',
                    'font-serif'
                  )}
                  aria-current="page"
                >
                  {index === 0 ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      {crumb.label}
                    </span>
                  ) : (
                    crumb.label
                  )}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className={cn(
                    'flex items-center gap-1',
                    'text-amber-700 hover:text-amber-900',
                    'transition-colors duration-200',
                    'hover:underline underline-offset-2'
                  )}
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  <span className="font-serif">{crumb.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
