"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { LogOut, PackagePlus, Pencil, RefreshCw, Save, Trash2 } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  description: string | null;
  affiliate_url: string | null;
  platform: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
};

type ProductForm = {
  name: string;
  category: string;
  price: string;
  original_price: string;
  image_url: string;
  description: string;
  affiliate_url: string;
  platform: string;
  is_featured: boolean;
  is_active: boolean;
};

const emptyForm: ProductForm = {
  name: "", category: "Thời trang nữ", price: "", original_price: "",
  image_url: "", description: "", affiliate_url: "", platform: "Shopee",
  is_featured: false, is_active: true
};

const inputClass = "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError("");
    const { data, error: queryError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (queryError) setError(queryError.message);
    else setProducts((data ?? []) as Product[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (alive) setUserEmail(data.session?.user.email ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
    });
    return () => {
      alive = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userEmail) void loadProducts();
  }, [userEmail, loadProducts]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError(authError.message);
    setLoading(false);
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setProducts([]);
  };

  const saveProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    if (!form.name.trim() || !form.price || !form.affiliate_url.trim()) {
      setError("Vui lòng nhập tên, giá và liên kết sản phẩm.");
      return;
    }
    setSaving(true);
    setError("");
    setMessage("");
    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      image_url: form.image_url.trim() || null,
      description: form.description.trim() || null,
      affiliate_url: form.affiliate_url.trim(),
      platform: form.platform,
      is_featured: form.is_featured,
      is_active: form.is_active
    };
    const result = editingId
      ? await supabase.from("products").update(payload).eq("id", editingId)
      : await supabase.from("products").insert(payload);
    if (result.error) setError(result.error.message);
    else {
      setMessage(editingId ? "Đã cập nhật sản phẩm." : "Đã thêm sản phẩm.");
      setForm(emptyForm);
      setEditingId(null);
      await loadProducts();
    }
    setSaving(false);
  };

  const editProduct = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      original_price: product.original_price == null ? "" : String(product.original_price),
      image_url: product.image_url ?? "",
      description: product.description ?? "",
      affiliate_url: product.affiliate_url ?? "",
      platform: product.platform ?? "Shopee",
      is_featured: product.is_featured,
      is_active: product.is_active
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (product: Product) => {
    if (!supabase || !window.confirm(`Bạn chắc chắn muốn xóa "${product.name}"?`)) return;
    const { error: deleteError } = await supabase.from("products").delete().eq("id", product.id);
    if (deleteError) setError(deleteError.message);
    else {
      setMessage("Đã xóa sản phẩm.");
      await loadProducts();
    }
  };

  if (!isSupabaseConfigured) {
    return <main className="min-h-screen bg-[#F7F6F2] px-5 py-16"><div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm"><p className="text-xs font-bold tracking-[0.2em] text-[#9B8060]">MY COLLECTION · ADMIN</p><h1 className="mt-3 text-3xl font-semibold">Cần kết nối Supabase</h1><p className="mt-4 text-sm leading-7 text-stone-600">Thêm NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY vào file .env.local theo hướng dẫn trong README. Sau đó chạy lại website.</p></div></main>;
  }

  if (!userEmail) {
    return <main className="flex min-h-screen items-center justify-center bg-[#F7F6F2] px-5 py-12"><form onSubmit={signIn} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_20px_70px_rgba(0,0,0,.07)] sm:p-10"><a href="/" className="text-xl font-black tracking-[-0.08em]">MY<span className="font-light">COLLECTION</span><span className="text-[#B49B78]">.</span></a><p className="mt-10 text-[10px] font-bold tracking-[0.24em] text-[#9B8060]">KHU VỰC QUẢN TRỊ</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Chào mừng trở lại.</h1><p className="mt-2 text-sm text-stone-500">Đăng nhập để quản lý bộ sưu tập sản phẩm.</p><label className={`${labelClass} mt-8`}>Email quản trị</label><input className={inputClass} type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com"/><label className={`${labelClass} mt-5`}>Mật khẩu</label><input className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu"/>{error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={loading} className="mt-7 w-full rounded-full bg-ink px-6 py-4 text-xs font-bold tracking-[0.16em] text-white transition hover:bg-[#8C765B] disabled:opacity-50">{loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}</button><a href="/" className="mt-6 block text-center text-xs text-stone-500 hover:text-black">← Quay lại website</a></form></main>;
  }

  return <main className="min-h-screen bg-[#F7F6F2] px-4 py-6 sm:px-8 sm:py-10">
    <div className="mx-auto max-w-7xl">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><a href="/" className="text-xl font-black tracking-[-0.08em]">MY<span className="font-light">COLLECTION</span><span className="text-[#B49B78]">.</span></a><p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-stone-500">BẢNG ĐIỀU KHIỂN QUẢN TRỊ</p></div>
        <div className="flex items-center gap-3"><span className="hidden text-xs text-stone-500 sm:inline">{userEmail}</span><button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2.5 text-xs font-semibold hover:bg-white"><LogOut size={14}/> Đăng xuất</button></div>
      </header>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(320px,.85fr)]">
        <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7 flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[0.2em] text-[#9B8060]">{editingId ? "CHỈNH SỬA" : "THÊM MỚI"}</p><h1 className="mt-2 text-2xl font-semibold">{editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h1></div><PackagePlus className="text-[#B49B78]" size={25}/></div>
          <form onSubmit={saveProduct} className="space-y-5">
            <div><label className={labelClass}>Tên sản phẩm *</label><input className={inputClass} required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Ví dụ: Áo sơ mi linen form rộng"/></div>
            <div className="grid gap-5 sm:grid-cols-2"><div><label className={labelClass}>Danh mục</label><select className={inputClass} value={form.category} onChange={e => setForm({...form,category:e.target.value})}>{["Thời trang nữ","Thời trang nam","Phụ kiện","Phong cách sống"].map(x => <option key={x}>{x}</option>)}</select></div><div><label className={labelClass}>Sàn thương mại</label><select className={inputClass} value={form.platform} onChange={e => setForm({...form,platform:e.target.value})}>{["Shopee","TikTok Shop","Khác"].map(x => <option key={x}>{x}</option>)}</select></div></div>
            <div className="grid gap-5 sm:grid-cols-2"><div><label className={labelClass}>Giá hiện tại (VNĐ) *</label><input className={inputClass} type="number" min="0" step="1000" required value={form.price} onChange={e => setForm({...form,price:e.target.value})} placeholder="199000"/></div><div><label className={labelClass}>Giá gốc (VNĐ)</label><input className={inputClass} type="number" min="0" step="1000" value={form.original_price} onChange={e => setForm({...form,original_price:e.target.value})} placeholder="299000"/></div></div>
            <div><label className={labelClass}>Link ảnh sản phẩm</label><input className={inputClass} type="url" value={form.image_url} onChange={e => setForm({...form,image_url:e.target.value})} placeholder="https://..."/></div>
            <div><label className={labelClass}>Link tiếp thị liên kết *</label><input className={inputClass} type="url" required value={form.affiliate_url} onChange={e => setForm({...form,affiliate_url:e.target.value})} placeholder="Dán link affiliate Shopee hoặc TikTok Shop"/></div>
            <div><label className={labelClass}>Mô tả ngắn</label><textarea className={inputClass} rows={3} value={form.description} onChange={e => setForm({...form,description:e.target.value})} placeholder="Mô tả điểm nổi bật của sản phẩm..."/></div>
            <div className="flex flex-wrap gap-5 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form,is_featured:e.target.checked})}/> Sản phẩm nổi bật</label><label className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e => setForm({...form,is_active:e.target.checked})}/> Hiển thị trên website</label></div>
            {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}{message && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
            <div className="flex flex-wrap gap-3"><button disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs font-bold tracking-wider text-white hover:bg-[#8C765B] disabled:opacity-50"><Save size={15}/>{saving ? "ĐANG LƯU..." : editingId ? "LƯU THAY ĐỔI" : "THÊM SẢN PHẨM"}</button>{editingId && <button type="button" onClick={() => {setEditingId(null);setForm(emptyForm);}} className="rounded-full border border-stone-300 px-6 py-3.5 text-xs font-semibold">HỦY CHỈNH SỬA</button>}</div>
          </form>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[0.2em] text-[#9B8060]">KHO SẢN PHẨM</p><h2 className="mt-2 text-2xl font-semibold">Danh sách ({products.length})</h2></div><button onClick={() => void loadProducts()} className="rounded-full border border-stone-200 p-3 hover:bg-stone-50" aria-label="Tải lại"><RefreshCw size={15}/></button></div>
          {loading ? <p className="py-10 text-center text-sm text-stone-500">Đang tải dữ liệu...</p> : products.length === 0 ? <div className="rounded-2xl bg-[#F7F6F2] p-8 text-center"><PackagePlus className="mx-auto text-stone-400" size={28}/><p className="mt-3 text-sm font-semibold">Chưa có sản phẩm nào</p><p className="mt-1 text-xs text-stone-500">Thêm sản phẩm đầu tiên bằng biểu mẫu bên trái.</p></div> : <div className="space-y-3">{products.map(product => <article key={product.id} className="flex gap-3 rounded-2xl border border-stone-100 p-3"><div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100">{product.image_url && <img src={product.image_url} alt={product.name} className="h-full w-full object-cover"/>}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-semibold">{product.name}</h3><span className={`rounded-full px-2 py-1 text-[9px] font-bold ${product.is_active ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>{product.is_active ? "ĐANG HIỂN THỊ" : "ĐÃ ẨN"}</span></div><p className="mt-1 text-xs text-stone-500">{product.category} · {product.platform}</p><p className="mt-2 text-sm font-bold">{product.price.toLocaleString("vi-VN")}₫</p><div className="mt-2 flex gap-3"><button onClick={() => editProduct(product)} className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-black"><Pencil size={12}/> Sửa</button><button onClick={() => void deleteProduct(product)} className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800"><Trash2 size={12}/> Xóa</button></div></div></article>)}</div>}
        </section>
      </div>
      <p className="mt-8 text-center text-[10px] tracking-wider text-stone-400">MY COLLECTION · ADMIN WORKSPACE</p>
    </div>
  </main>;
}
