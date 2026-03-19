import React, { useState } from 'react';
import { TabBar, Button, Image, Toast } from 'antd-mobile';

const HomeIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);
const CartIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);
const UserIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const products = [
  { id: 1, title: '简约时尚T恤男款', price: 89, originalPrice: 129, image: 'https://picsum.photos/400/400?random=1', description: '简约时尚设计，舒适棉质面料，适合日常穿着' },
  { id: 2, title: '休闲运动裤女款', price: 129, originalPrice: 169, image: 'https://picsum.photos/400/400?random=2', description: '弹性面料，舒适贴身，适合运动和日常穿着' },
  { id: 3, title: '针织开衫', price: 259, originalPrice: 299, image: 'https://picsum.photos/400/400?random=3', description: '柔软针织材质，百搭款式' },
  { id: 4, title: '运动卫衣', price: 189, originalPrice: 229, image: 'https://picsum.photos/400/400?random=4', description: '保暖舒适，运动休闲两相宜' },
];

function ProductDetail({ product, onBack, onAddToCart }) {
  const [selected, setSelected] = useState(false);
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: 80 }}>
      <Image src={product.image} alt={product.title} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
      <div className="detail-info">
        <div className="detail-title">{product.title}</div>
        <div className="detail-price">¥{product.price} <span style={{ color: '#999', textDecoration: 'line-through', fontSize: 14 }}>¥{product.originalPrice}</span></div>
        <div className="detail-description">{product.description}</div>
        <Button block color="primary" size="large" onClick={() => { onAddToCart(); setSelected(true); }} disabled={selected}>{selected ? '已加入购物车' : '加入购物车'}</Button>
        <Button block color="primary" size="large" style={{ marginTop: 12, backgroundColor: '#ff4d4f' }}>立即购买</Button>
      </div>
      <div style={{ padding: 16, background: 'white', marginTop: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>商品详情</div>
        <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
          <p>• 品质保证：正品保障，假一赔三</p>
          <p>• 无忧退换：7天无理由退换货</p>
          <p>• 快速配送：下单后24小时内发货</p>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <Button block color="primary" onClick={onBack}>返回首页</Button>
      </div>
    </div>
  );
}

const menuItems = [
  { icon: '❤️', title: '我的收藏' },
  { icon: '📋', title: '我的订单' },
  { icon: '🛒', title: '购物车' },
  { icon: '📍', title: '收货地址' },
  { icon: '💰', title: '我的钱包' },
  { icon: '🎫', title: '优惠券' },
  { icon: '⚙️', title: '设置' },
];

function MyPage() {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 36 }}>👤</div>
        <div style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>用户昵称</div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>会员等级：普通会员</div>
      </div>
      <div style={{ background: 'white', marginTop: 12, borderRadius: 8, overflow: 'hidden' }}>
        {menuItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: i < menuItems.length - 1 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: 22, marginRight: 12 }}>{item.icon}</span>
            <span style={{ fontSize: 15, color: '#333' }}>{item.title}</span>
            <span style={{ marginLeft: 'auto', color: '#999', fontSize: 14 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductListPage({ keyword, onKeywordChange, onProductClick, onBack }) {
  const filtered = keyword ? products.filter(p => p.title.includes(keyword)) : products;
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #f0f0f0' }}>
        <span style={{ cursor: 'pointer', fontSize: 18 }} onClick={onBack}>←</span>
        <input type="text" placeholder="搜索商品" value={keyword || ''} onInput={(e) => onKeywordChange(e.target.value)} style={{ flex: 1, border: '1px solid #eee', borderRadius: 8, padding: '8px 12px', fontSize: 14, outline: 'none' }} />
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>共 {filtered.length} 件商品</div>
        {filtered.map(p => (
          <div key={p.id} className="product-card" style={{ margin: '0 0 12px', cursor: 'pointer' }} onClick={() => onProductClick(p)}>
            <div style={{ display: 'flex' }}>
              <img src={p.image} alt={p.title} style={{ width: 120, height: 120, objectFit: 'cover', flexShrink: 0 }} />
              <div className="product-info" style={{ flex: 1 }}>
                <div className="product-title">{p.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <span className="product-price">¥{p.price}</span>
                  <span style={{ color: '#999', fontSize: 12, textDecoration: 'line-through' }}>¥{p.originalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage({ onProductClick, onSearch }) {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: 20, color: 'white' }}>
        <h2 style={{ margin: 0, fontSize: 20, textAlign: 'center' }}>服装商城 · 品质好物</h2>
        <p style={{ margin: '8px 0 0', fontSize: 14, opacity: 0.9, textAlign: 'center' }}>品质生活，从这里开始</p>
        <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={onSearch}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <span style={{ fontSize: 14, opacity: 0.9 }}>搜索商品</span>
        </div>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ background: 'white', borderRadius: 8, padding: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>热销推荐</div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
            {products.slice(0, 3).map(p => (
              <div key={p.id} style={{ flex: '0 0 140px', cursor: 'pointer' }} onClick={() => onProductClick(p)}>
                <img src={p.image} alt={p.title} style={{ width: 140, height: 140, borderRadius: 8, objectFit: 'cover', marginBottom: 8 }} />
                <div style={{ fontSize: 12, color: '#333' }}>{p.title}</div>
                <div style={{ fontSize: 14, color: '#ff4d4f', fontWeight: 'bold' }}>¥{p.price}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 12 }}>新品上架</div>
          {products.map(p => (
            <div key={p.id} className="product-card" style={{ margin: '0 0 12px', cursor: 'pointer' }} onClick={() => onProductClick(p)}>
              <div style={{ position: 'relative' }}>
                <img src={p.image} alt={p.title} className="product-image" />
                <span style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 4, fontSize: 12, color: '#ff4d4f' }}>促销</span>
              </div>
              <div className="product-info">
                <div className="product-title">{p.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="product-price">¥{p.price}</span>
                  <span style={{ color: '#999', fontSize: 12, textDecoration: 'line-through' }}>¥{p.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductList, setShowProductList] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleProductClick = (p) => { setSelectedProduct(p); setActiveTab('detail'); };
  const handleBack = () => { setSelectedProduct(null); setActiveTab('home'); };
  const handleGoToSearch = () => { setSearchKeyword(''); setShowProductList(true); };
  const handleBackFromProductList = () => { setShowProductList(false); setSearchKeyword(''); };
  const handleAddToCart = () => { Toast.show('已加入购物车', { icon: 'success' }); };

  const renderContent = () => {
    if (selectedProduct) return <ProductDetail product={selectedProduct} onBack={handleBack} onAddToCart={handleAddToCart} />;
    if (showProductList) return <ProductListPage keyword={searchKeyword} onKeywordChange={setSearchKeyword} onProductClick={handleProductClick} onBack={handleBackFromProductList} />;
    if (activeTab === 'home') return <HomePage onProductClick={handleProductClick} onSearch={handleGoToSearch} />;
    if (activeTab === 'cart') return (
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
          <div style={{ fontSize: 16, color: '#999' }}>购物车为空</div>
          <Button color="primary" onClick={() => setActiveTab('home')} style={{ marginTop: 16 }}>去逛逛</Button>
        </div>
      </div>
    );
    if (activeTab === 'my') return <MyPage />;
    return <HomePage onProductClick={handleProductClick} onSearch={handleGoToSearch} />;
  };

  return (
    <div style={{ position: 'relative' }}>
      {renderContent()}
      {!selectedProduct && !showProductList && (
        <TabBar activeKey={activeTab} onChange={(k) => setActiveTab(k)} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', borderTop: '1px solid #e5e5e5', background: 'white', paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <TabBar.Item key="home" icon={<HomeIcon />} title="首页" />
          <TabBar.Item key="cart" icon={<CartIcon />} title="购物车" />
          <TabBar.Item key="my" icon={<UserIcon />} title="我的" />
        </TabBar>
      )}
    </div>
  );
}
