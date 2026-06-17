import { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Grid3X3, MapPin, Filter, Calendar } from 'lucide-react';
import FloorNav from '@/components/FloorNav';
import ExhibitCard from '@/components/ExhibitCard';
import Breadcrumb from '@/components/Breadcrumb';
import { useMuseumStore } from '@/store/museumStore';
import { cn } from '@/lib/utils';

const ExhibitListPage = () => {
  const params = useParams();
  const { floorId, hallId } = params;
  const getFloorById = useMuseumStore((state) => state.getFloorById);
  const getHallById = useMuseumStore((state) => state.getHallById);
  const setCurrentHall = useMuseumStore((state) => state.setCurrentHall);
  const markHallVisited = useMuseumStore((state) => state.markHallVisited);

  const floor = floorId ? getFloorById(floorId) : undefined;
  const hall = floorId && hallId ? getHallById(floorId, hallId) : undefined;

  const [eraFilter, setEraFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');

  useEffect(() => {
    if (hallId) {
      setCurrentHall(hallId);
      markHallVisited(hallId);
    }
    return () => setCurrentHall(null);
  }, [hallId, setCurrentHall, markHallVisited]);

  const allEras = useMemo(() => {
    if (!hall) return [];
    const eras = new Set(hall.exhibits.map((e) => e.era));
    return Array.from(eras);
  }, [hall]);

  const allZones = useMemo(() => {
    if (!hall) return [];
    const zones = new Set(hall.exhibits.map((e) => e.zone));
    return Array.from(zones);
  }, [hall]);

  const filteredExhibits = useMemo(() => {
    if (!hall) return [];
    return hall.exhibits.filter((exhibit) => {
      const eraMatch = eraFilter === 'all' || exhibit.era === eraFilter;
      const zoneMatch = zoneFilter === 'all' || exhibit.zone === zoneFilter;
      return eraMatch && zoneMatch;
    });
  }, [hall, eraFilter, zoneFilter]);

  if (!floor || !hall) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="relative overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8860B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回展厅列表
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Grid3X3 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-serif font-bold">{hall.name}</h1>
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-medium">
                  {hall.roomNumber}
                </span>
              </div>
              <p className="text-stone-400 font-serif mt-1">{hall.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span className="text-sm">
                <span className="text-stone-400">所属楼层：</span>
                <span className="text-white font-medium">{floor.name}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span className="text-sm">
                <span className="text-stone-400">展品数量：</span>
                <span className="text-white font-medium">{hall.exhibitCount} 件</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <FloorNav />

              <div className="mt-6 bg-white rounded-xl border border-stone-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-amber-700" />
                  <span className="text-sm font-medium text-stone-800">筛选展品</span>
                </div>

                {allZones.length > 1 && (
                  <div className="mb-4">
                    <label className="text-xs text-stone-500 block mb-2">按馆区</label>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => setZoneFilter('all')}
                        className={cn(
                          'w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors',
                          zoneFilter === 'all'
                            ? 'bg-amber-50 text-amber-800'
                            : 'text-stone-600 hover:bg-stone-50'
                        )}
                      >
                        全部馆区
                      </button>
                      {allZones.map((zone) => (
                        <button
                          key={zone}
                          onClick={() => setZoneFilter(zone)}
                          className={cn(
                            'w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors',
                            zoneFilter === zone
                              ? 'bg-amber-50 text-amber-800'
                              : 'text-stone-600 hover:bg-stone-50'
                          )}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {allEras.length > 1 && (
                  <div>
                    <label className="text-xs text-stone-500 block mb-2">按年代</label>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => setEraFilter('all')}
                        className={cn(
                          'w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors',
                          eraFilter === 'all'
                            ? 'bg-amber-50 text-amber-800'
                            : 'text-stone-600 hover:bg-stone-50'
                        )}
                      >
                        全部年代
                      </button>
                      {allEras.map((era) => (
                        <button
                          key={era}
                          onClick={() => setEraFilter(era)}
                          className={cn(
                            'w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors',
                            eraFilter === era
                              ? 'bg-amber-50 text-amber-800'
                              : 'text-stone-600 hover:bg-stone-50'
                          )}
                        >
                          {era}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(eraFilter !== 'all' || zoneFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setEraFilter('all');
                      setZoneFilter('all');
                    }}
                    className="w-full mt-4 text-sm text-amber-700 hover:text-amber-900 border-t border-stone-100 pt-3"
                  >
                    清除筛选
                  </button>
                )}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <section className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-serif font-bold text-stone-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-amber-700" />
                  展厅展品
                </h2>
                <span className="text-sm text-stone-500">
                  共 {filteredExhibits.length} 件展品
                </span>
              </div>
              <p className="text-stone-600 font-serif">
                点击展品卡片查看详细信息，了解更多历史背景
              </p>
            </section>

            {filteredExhibits.length > 0 ? (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredExhibits.map((exhibit, index) => (
                  <div
                    key={exhibit.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ExhibitCard
                      exhibit={exhibit}
                      floorId={floor.id}
                      hallId={hall.id}
                    />
                  </div>
                ))}
              </section>
            ) : (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-stone-400" />
                </div>
                <h3 className="text-lg font-serif font-medium text-stone-800 mb-2">
                  没有找到符合条件的展品
                </h3>
                <p className="text-stone-500 text-sm mb-4">
                  请尝试调整筛选条件
                </p>
                <button
                  onClick={() => {
                    setEraFilter('all');
                    setZoneFilter('all');
                  }}
                  className="text-amber-700 hover:text-amber-900 text-sm font-medium"
                >
                  清除筛选条件
                </button>
              </div>
            )}

            <section className="mt-12 p-6 bg-amber-50 rounded-xl border border-amber-200">
              <h3 className="text-lg font-serif font-semibold text-stone-800 mb-2">
                💡 观展建议
              </h3>
              <p className="text-stone-600 font-serif leading-relaxed">
                每件展品平均欣赏时间约 5-10 分钟。建议仔细阅读展品介绍，
                也可以点击「相关展品」探索更多同类型或同时期的珍贵文物。
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-stone-800 text-stone-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-serif">
            © 2024 华夏文博馆 · 传承文明 启迪未来
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ExhibitListPage;
