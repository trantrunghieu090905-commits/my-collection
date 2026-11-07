"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";

const categories = ["Tất cả", "Thời trang nữ", "Thời trang nam", "Phụ kiện", "Phong cách sống"];

const products = [
  { id: 1, name: "Áo sơ mi linen form rộng", category: "Thời trang nữ", price: "189.000₫", tag: "Được yêu thích", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85", tone: "Nắng nhẹ, thoáng mát và dễ phối." },
  { id: 2, name: "Túi đeo vai tối giản", category: "Phụ kiện", price: "245.000₫", tag: "Lựa chọn của biên tập", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85", tone: "Một điểm nhấn tinh tế cho mọi outfit." },
  { id: 3, name: "Áo thun basic premium", category: "Thời trang nam", price: "129.000₫", tag: "Dễ ứng dụng", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", tone: "Đơn giản, linh hoạt, mặc được mỗi ngày." },
  { id: 4, name: "Kính mắt dáng cổ điển", category: "Phụ kiện", price: "159.000₫", tag: "Điểm nhấn", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85", tone: "Hoàn thiện diện mạo bằng chi tiết nhỏ." },
  { id: 5, name: "Set đồ mặc nhà mềm mại", category: "Thời trang nữ", price: "219.000₫", tag: "Thoải mái mỗi ngày", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85", tone: "Ưu tiên sự thoải mái mà vẫn có gu." },
  { id: 6, name: "Đồng hồ phong cách tối giản", category: "Phong cách sống", price: "329.000₫", tag: "Đáng cân nhắc", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85", tone: "Thiết kế gọn gàng, hợp nhiều dịp." }
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === "Tất cả" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeCategory, search]);

  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="bg-ink px-4 py-2 text-center text-[10px] font-medium tracking-[0.22em] text-white sm:text-xs">
        CURATED FINDS · YOUR STYLE, YOUR COLLECTION
      </div>

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a href="#" className="text-xl font-black tracking-[-0.08em] sm:text-2xl">MY<span className="font-light">COLLECTION</span><span className="text-[#B49B78]">.</span></a>
        <nav className="hidden items-center gap-8 text-xs font-semibold tracking-[0.12em] md:flex">
          <a className="transition hover:text-[#9B8060]" href="#collection">BỘ SƯU TẬP</a>
          <a className="transition hover:text-[#9B8060]" href="#story">CÂU CHUYỆN</a>
          <a className="transition hover:text-[#9B8060]" href="#newsletter">LIÊN HỆ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#collection" aria-label="Tìm sản phẩm" className="hidden rounded-full border border-black/10 p-2.5 transition hover:bg-black hover:text-white sm:inline-flex"><Search size={16}/></a>
          <a href="#collection" className="relative rounded-full border border-black/10 p-2.5 transition hover:bg-black hover:text-white" aria-label="Sản phẩm đã lưu"><Heart size={16}/>{saved.length > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B49B78] px-1 text-[9px] text-white">{saved.length}</span>}</a>
          <button className="rounded-full border border-black/10 p-2.5 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">{menuOpen ? <X size={16}/> : <Menu size={16}/>}</button>
        </div>
        {menuOpen && <div className="absolute left-5 right-5 top-[72px] flex flex-col gap-4 rounded-2xl border border-black/10 bg-[#F7F6F2] p-5 text-xs font-semibold tracking-widest shadow-xl md:hidden"><a href="#collection" onClick={() => setMenuOpen(false)}>BỘ SƯU TẬP</a><a href="#story" onClick={() => setMenuOpen(false)}>CÂU CHUYỆN</a><a href="#newsletter" onClick={() => setMenuOpen(false)}>LIÊN HỆ</a></div>}
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 sm:px-8 md:grid-cols-[1.02fr_.98fr] md:items-center md:gap-12 md:pb-24 lg:px-12">
        <div className="relative z-10 py-6 md:py-12">
          <p className="mb-5 flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-[#9B8060] sm:text-xs"><Sparkles size={14}/> THE ART OF CHOOSING WELL</p>
          <h1 className="max-w-xl text-[clamp(3.2rem,8vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.075em]">Ít hơn.<br/><span className="font-serif font-normal italic">Chất hơn.</span><br/>Đúng gu bạn.</h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-[#77736D] sm:text-base">Một góc nhỏ dành cho những món đồ đáng chú ý — được chọn lọc theo phong cách, tính ứng dụng và giá trị sử dụng.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a href="#collection" className="group inline-flex items-center gap-5 rounded-full bg-ink px-7 py-4 text-[11px] font-bold tracking-[0.16em] text-white transition hover:bg-[#8C765B]">KHÁM PHÁ BỘ SƯU TẬP <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1"/></a>
            <span className="text-[10px] tracking-[0.16em] text-[#77736D]">CURATED WITH CARE · 2026</span>
          </div>
          <div className="mt-14 hidden items-center gap-4 md:flex"><div className="h-px w-14 bg-[#B49B78]"/><span className="text-[10px] tracking-[0.2em] text-[#77736D]">SCROLL TO EXPLORE</span><ArrowDown size={13} className="text-[#9B8060]"/></div>
        </div>
        <div className="relative min-h-[420px] sm:min-h-[540px]">
          <div className="absolute right-0 top-0 h-[88%] w-[82%] overflow-hidden rounded-t-[48%] rounded-b-[8px] bg-[#E6DED1]">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90" alt="Phong cách thời trang được tuyển chọn" className="h-full w-full object-cover"/>
          </div>
          <div className="absolute bottom-0 left-0 w-[48%] overflow-hidden rounded-sm border-[8px] border-[#F7F6F2] bg-white shadow-xl">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85" alt="Chi tiết trang phục" className="aspect-[4/5] w-full object-cover"/>
          </div>
          <div className="absolute bottom-12 right-0 rounded-full border border-[#B49B78]/50 bg-[#F7F6F2]/90 px-5 py-3 text-[9px] font-bold tracking-[0.2em] backdrop-blur">FIND YOUR SIGNATURE</div>
        </div>
      </section>

      <section id="collection" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><p className="mb-3 text-[10px] font-bold tracking-[0.25em] text-[#9B8060]">THE EDIT</p><h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">Bộ sưu tập <span className="font-serif font-normal italic">chọn lọc.</span></h2><p className="mt-4 max-w-lg text-sm leading-6 text-[#77736D]">Không cần quá nhiều lựa chọn. Chỉ cần những món đồ phù hợp với bạn.</p></div>
            <label className="flex items-center gap-3 border-b border-black/20 pb-2 sm:w-56"><Search size={15} className="text-[#77736D]"/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm món đồ bạn thích..." className="w-full bg-transparent text-xs outline-none placeholder:text-[#A5A19B]"/></label>
          </div>

          <div className="mt-10 flex gap-2 overflow-x-auto pb-3">
            {categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-5 py-3 text-[10px] font-bold tracking-[0.12em] transition ${activeCategory === category ? "border-ink bg-ink text-white" : "border-black/10 text-[#77736D] hover:border-black"}`}>{category}</button>)}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-14">
            {visibleProducts.map((product, index) => <article key={product.id} className="group">
              <div className="relative overflow-hidden bg-[#F0EEE9]">
                <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"/>
                <span className="absolute left-3 top-3 bg-[#F7F6F2]/90 px-3 py-2 text-[8px] font-bold tracking-[0.14em] backdrop-blur sm:left-4 sm:top-4 sm:text-[9px]">{product.tag.toUpperCase()}</span>
                <button onClick={() => toggleSaved(product.id)} aria-label="Lưu sản phẩm" className={`absolute right-3 top-3 rounded-full p-2.5 backdrop-blur transition sm:right-4 sm:top-4 ${saved.includes(product.id) ? "bg-ink text-white" : "bg-white/90 text-ink hover:bg-ink hover:text-white"}`}><Heart size={15} fill={saved.includes(product.id) ? "currentColor" : "none"}/></button>
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-3 text-center text-[9px] font-bold tracking-[0.15em] text-white transition duration-300 group-hover:translate-y-0">KHÁM PHÁ SẢN PHẨM <ArrowUpRight className="ml-1 inline" size={12}/></div>
              </div>
              <div className="pt-4"><p className="text-[9px] font-semibold tracking-[0.16em] text-[#9B8060]">{product.category.toUpperCase()}</p><h3 className="mt-2 text-sm font-semibold sm:text-base">{product.name}</h3><p className="mt-1 text-xs text-[#77736D]">{product.tone}</p><p className="mt-3 text-sm font-bold">{product.price}</p></div>
            </article>)}
          </div>
          {visibleProducts.length === 0 && <p className="py-16 text-center text-sm text-[#77736D]">Chưa tìm thấy sản phẩm phù hợp. Thử từ khóa khác nhé.</p>}
          <div className="mt-14 text-center"><p className="text-[10px] tracking-[0.16em] text-[#77736D]">CÁC SẢN PHẨM ĐANG ĐƯỢC CẬP NHẬT</p></div>
        </div>
      </section>

      <section id="story" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center md:py-28 lg:px-12">
        <div className="overflow-hidden"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="Không gian thời trang và mua sắm" className="aspect-[5/4] w-full object-cover"/></div>
        <div className="md:pl-8"><p className="mb-4 text-[10px] font-bold tracking-[0.25em] text-[#9B8060]">OUR PHILOSOPHY</p><h2 className="text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">Mua sắm có chọn lọc.<br/><span className="font-serif font-normal italic">Sống theo cách riêng.</span></h2><p className="mt-6 text-sm leading-7 text-[#77736D]">MY COLLECTION được tạo ra để giúp bạn khám phá những sản phẩm phù hợp với phong cách và nhu cầu thực tế. Chúng tôi ưu tiên tính thẩm mỹ, khả năng ứng dụng và thông tin rõ ràng để bạn tự tin hơn trước mỗi lựa chọn.</p><a href="#collection" className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-2 text-[10px] font-bold tracking-[0.16em]">TÌM CẢM HỨNG CỦA BẠN <ArrowRight size={14}/></a></div>
      </section>

      <section id="newsletter" className="bg-[#E9E3D8] px-5 py-16 text-center sm:py-20">
        <p className="text-[10px] font-bold tracking-[0.25em] text-[#8C765B]">A LITTLE NOTE FROM US</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.06em] sm:text-5xl">Gu riêng bắt đầu từ <span className="font-serif font-normal italic">lựa chọn nhỏ.</span></h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#77736D]">Theo dõi MY COLLECTION để cập nhật những món đồ mới được tuyển chọn.</p>
        <a href="#collection" className="mt-8 inline-flex items-center gap-4 rounded-full bg-ink px-7 py-4 text-[10px] font-bold tracking-[0.16em] text-white transition hover:bg-[#8C765B]">KHÁM PHÁ NGAY <ArrowUpRight size={15}/></a>
      </section>

      <footer className="bg-ink px-5 py-9 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div><a href="#" className="text-xl font-black tracking-[-0.08em]">MY<span className="font-light">COLLECTION</span><span className="text-[#B49B78]">.</span></a><p className="mt-2 text-[10px] tracking-[0.14em] text-white/50">CHỌN LỌC ĐIỀU BẠN YÊU THÍCH.</p></div>
          <p className="max-w-md text-[10px] leading-5 text-white/50">Một số liên kết sản phẩm trên website có thể là liên kết tiếp thị liên kết. MY COLLECTION có thể nhận hoa hồng khi bạn mua hàng qua liên kết, không làm thay đổi giá bạn thanh toán.</p>
          <p className="text-[9px] tracking-[0.12em] text-white/40">© 2026 MY COLLECTION</p>
        </div>
      </footer>
    </main>
  );
}
