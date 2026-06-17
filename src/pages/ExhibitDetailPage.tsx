import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  BookOpen,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import FloorNav from '@/components/FloorNav';
import Breadcrumb from '@/components/Breadcrumb';
import ImageFallback from '@/components/ImageFallback';
import { useMuseumStore } from '@/store/museumStore';

const ExhibitDetailPage = () => {
  const params = useParams();
  const { floorId, hallId, exhibitId } = params;
  const getFloorById = useMuseumStore((state) => state.getFloorById);
  const getHallById = useMuseumStore((state) => state.getHallById);
  const getExhibitById = useMuseumStore((state) => state.getExhibitById);
  const getRelatedExhibits = useMuseumStore((state) => state.getRelatedExhibits);
  const setCurrentExhibit = useMuseumStore((state) => state.setCurrentExhibit);

  const floor = floorId ? getFloorById(floorId) : undefined;
  const hall = floorId && hallId ? getHallById(floorId, hallId) : undefined;
  const exhibit = exhibitId ? getExhibitById(exhibitId) : undefined;
  const relatedExhibits = exhibit
    ? getRelatedExhibits(exhibit.relatedExhibitIds)
    : [];

  useEffect(() => {
    if (exhibitId) {
      setCurrentExhibit(exhibitId);
    }
    return () => setCurrentExhibit(null);
  }, [exhibitId, setCurrentExhibit]);

  if (!floor || !hall || !exhibit) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Breadcrumb />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <FloorNav />
            </div>
          </aside>

          <div className="lg:col-span-3">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回展品列表
            </button>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-square lg:aspect-auto bg-stone-100">
                  <ImageFallback
                    src={exhibit.imageUrl}
                    alt={exhibit.name}
                    className="w-full h-full"
                    imgClassName="hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-8 lg:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                    <h1 className="text-3xl lg:text-4xl font-serif font-bold text-stone-800 leading-tight">
                      {exhibit.name}
                    </h1>
                    <span className="shrink-0 px-3 py-1.5 bg-amber-50 text-amber-800 text-sm font-medium rounded border border-amber-200">
                      {exhibit.era}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-700" />
                      <div>
                        <p className="text-xs text-stone-500">所在馆区</p>
                        <p className="text-sm font-medium text-stone-800">
                          {exhibit.zone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-700" />
                      <div>
                        <p className="text-xs text-stone-500">年代</p>
                        <p className="text-sm font-medium text-stone-800">
                          {exhibit.era}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-amber-700" />
                      <h2 className="text-lg font-serif font-semibold text-stone-800">
                        文物背景
                      </h2>
                    </div>
                    <p className="text-stone-700 leading-relaxed font-serif text-lg">
                      {exhibit.background}
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-amber-700" />
                      <h2 className="text-lg font-serif font-semibold text-stone-800">
                        详细介绍
                      </h2>
                    </div>
                    <p className="text-stone-700 leading-relaxed font-serif">
                      {exhibit.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-stone-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {hall.roomNumber} · {hall.name}
                    </span>
                    <span className="text-stone-300">|</span>
                    <span>{floor.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {relatedExhibits.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-700" />
                  相关展品
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedExhibits.map((relExhibit) => (
                    <Link
                      key={relExhibit.id}
                      to={`/floor/${floorId}/hall/${hallId}/exhibit/${relExhibit.id}`}
                      className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                    >
                      <div className="aspect-[4/3] bg-stone-100">
                        <ImageFallback
                          src={relExhibit.imageUrl}
                          alt={relExhibit.name}
                          className="w-full h-full"
                          imgClassName="group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-serif font-semibold text-stone-800 group-hover:text-amber-800 transition-colors">
                            {relExhibit.name}
                          </h3>
                          <span className="shrink-0 px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded border border-amber-100">
                            {relExhibit.era.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-sm text-stone-500 line-clamp-2 font-serif mb-3">
                          {relExhibit.background}
                        </p>
                        <span className="inline-flex items-center gap-1 text-amber-700 text-sm font-medium group-hover:text-amber-900">
                          查看详情
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to={`/floor/${floorId}/hall/${hallId}`}
                className="group p-6 bg-white rounded-xl border border-stone-200 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="font-serif font-semibold text-stone-800">
                    返回展厅
                  </h3>
                </div>
                <p className="text-sm text-stone-500">
                  继续浏览 {hall.name} 的其他展品
                </p>
              </Link>

              <Link
                to={`/floor/${floorId}`}
                className="group p-6 bg-white rounded-xl border border-stone-200 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                    <MapPin className="w-5 h-5 text-stone-600" />
                  </div>
                  <h3 className="font-serif font-semibold text-stone-800">
                    查看本层其他展厅
                  </h3>
                </div>
                <p className="text-sm text-stone-500">
                  探索 {floor.name} 的更多精彩展品
                </p>
              </Link>
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

export default ExhibitDetailPage;
