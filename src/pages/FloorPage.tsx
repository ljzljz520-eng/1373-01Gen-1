import { Building2, MapPin, Clock, Sparkles } from 'lucide-react';
import FloorNav from '@/components/FloorNav';
import Breadcrumb from '@/components/Breadcrumb';
import { useMuseumStore } from '@/store/museumStore';

const FloorPage = () => {
  const floors = useMuseumStore((state) => state.floors);

  const totalHalls = floors.reduce((sum, floor) => sum + floor.halls.length, 0);
  const totalExhibits = floors.reduce(
    (sum, floor) =>
      sum + floor.halls.reduce((hallSum, hall) => hallSum + hall.exhibitCount, 0),
    0
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-gradient-to-r from-stone-800 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-10 h-10 text-amber-400" />
            <h1 className="text-4xl font-serif font-bold tracking-tight">
              华夏文博馆
            </h1>
          </div>
          <p className="text-lg text-stone-300 max-w-2xl font-serif leading-relaxed">
            穿越五千年华夏文明，品鉴历朝历代艺术珍品。从青铜器的雄浑厚重，到书画的飘逸灵动，
            每一件展品都诉说着中华文明的璀璨历程。
          </p>

          <div className="grid grid-cols-3 gap-6 mt-10 max-w-2xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">展厅</span>
              </div>
              <p className="text-3xl font-serif font-bold">{totalHalls}</p>
              <p className="text-xs text-stone-400 mt-1">个主题展厅</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">展品</span>
              </div>
              <p className="text-3xl font-serif font-bold">{totalExhibits}</p>
              <p className="text-xs text-stone-400 mt-1">件珍贵藏品</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">建议时长</span>
              </div>
              <p className="text-3xl font-serif font-bold">2-3</p>
              <p className="text-xs text-stone-400 mt-1">小时参观</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <Breadcrumb />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              <FloorNav />
            </div>
          </aside>

          <div className="lg:col-span-3">
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-amber-600 rounded-full" />
                选择您感兴趣的楼层开始参观
              </h2>
              <p className="text-stone-600 font-serif leading-relaxed mb-8">
                本馆共设四层展区，地上三层为常设展厅，地下一层为临时展厅。展品年代跨度从新石器时代至明清，
                全面展现中华文明的发展脉络。
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {floors
                .sort((a, b) => b.number - a.number)
                .map((floor) => (
                  <div
                    key={floor.id}
                    className="bg-white rounded-xl border border-stone-200 p-6 hover:shadow-lg hover:border-amber-200 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-white text-2xl font-serif font-bold shadow-lg">
                        {floor.number > 0 ? `${floor.number}F` : 'B1'}
                      </div>
                      <span className="text-sm text-stone-500 font-serif">
                        {floor.halls.length} 个展厅 ·{' '}
                        {floor.halls.reduce(
                          (sum, h) => sum + h.exhibitCount,
                          0
                        )}{' '}
                        件展品
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2 group-hover:text-amber-800 transition-colors">
                      {floor.name}
                    </h3>
                    <p className="text-stone-600 text-sm font-serif leading-relaxed mb-4">
                      {floor.description}
                    </p>
                    <div className="space-y-2">
                      {floor.halls.map((hall) => (
                        <div
                          key={hall.id}
                          className="flex items-center justify-between text-sm py-1.5 border-b border-stone-100 last:border-0"
                        >
                          <span className="text-stone-700 font-serif">
                            {hall.name}
                          </span>
                          <span className="text-stone-400">
                            {hall.roomNumber}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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

export default FloorPage;
