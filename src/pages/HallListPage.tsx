import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Grid3X3, MapPin } from 'lucide-react';
import FloorNav from '@/components/FloorNav';
import HallCard from '@/components/HallCard';
import Breadcrumb from '@/components/Breadcrumb';
import { useMuseumStore } from '@/store/museumStore';
import { cn } from '@/lib/utils';

const HallListPage = () => {
  const params = useParams();
  const { floorId } = params;
  const getFloorById = useMuseumStore((state) => state.getFloorById);
  const setCurrentFloor = useMuseumStore((state) => state.setCurrentFloor);
  const markHallVisited = useMuseumStore((state) => state.markHallVisited);
  const visitedHalls = useMuseumStore((state) => state.visitedHalls);

  const floor = floorId ? getFloorById(floorId) : undefined;

  useEffect(() => {
    if (floorId) {
      setCurrentFloor(floorId);
    }
    return () => setCurrentFloor(null);
  }, [floorId, setCurrentFloor]);

  if (!floor) {
    return <Navigate to="/" replace />;
  }

  const visitedCount = floor.halls.filter((h) => visitedHalls.has(h.id)).length;
  const progressPercent = Math.round((visitedCount / floor.halls.length) * 100);

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
            返回首页
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-white text-3xl font-serif font-bold shadow-lg">
              {floor.number > 0 ? `${floor.number}F` : 'B1'}
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold">{floor.name}</h1>
              <p className="text-stone-400 font-serif mt-1">{floor.description}</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 max-w-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium">本层参观进度</span>
              </div>
              <span className="text-sm text-stone-300">
                {visitedCount} / {floor.halls.length} 展厅
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-stone-400 mt-2">
              点击展厅卡片进入参观，系统将自动记录您的足迹
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <FloorNav />
            </div>
          </aside>

          <div className="lg:col-span-3">
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-amber-700" />
                本层展厅
              </h2>
              <p className="text-stone-600 font-serif">
                共 {floor.halls.length} 个展厅，{floor.halls.reduce((sum, h) => sum + h.exhibitCount, 0)} 件展品
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {floor.halls.map((hall, index) => (
                <div
                  key={hall.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => markHallVisited(hall.id)}
                >
                  <HallCard hall={hall} floorId={floor.id} />
                </div>
              ))}
            </section>

            <section
              className={cn(
                'mt-12 p-6 rounded-xl border',
                visitedCount === floor.halls.length
                  ? 'bg-green-50 border-green-200'
                  : 'bg-amber-50 border-amber-200'
              )}
            >
              <h3 className="text-lg font-serif font-semibold text-stone-800 mb-2">
                {visitedCount === floor.halls.length
                  ? '🎉 恭喜！您已参观完本层所有展厅'
                  : '💡 参观提示'}
              </h3>
              <p className="text-stone-600 font-serif leading-relaxed">
                {visitedCount === floor.halls.length
                  ? '您已浏览本层全部展品，建议前往其他楼层继续参观，或返回首页查看推荐路线。'
                  : '建议按照展厅编号顺序参观，以获得最佳的观展体验。每个展厅平均参观时间约 20-30 分钟。'}
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

export default HallListPage;
