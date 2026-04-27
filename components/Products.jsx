'use client';
import { useState } from 'react';

export default function Products({ store, products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '7829747061', address: '', quantity: 1 });

  const handleOrder = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const sendWhatsAppOrder = () => {
    const text = `New Order from Dukkan Setu Store: ${store.name}\n\n` +
                 `Product: ${selectedProduct.name}\n` +
                 `Quantity: ${customerInfo.quantity}\n` +
                 `Price: ₹${selectedProduct.price * customerInfo.quantity}\n\n` +
                 `Customer Details:\n` +
                 `Name: ${customerInfo.name}\n` +
                 `Phone: ${customerInfo.phone}\n` +
                 `Address: ${customerInfo.address}\n\n` +
                 `Please confirm the order!`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${store.phone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <section id="products" className="what-we-do section-space section-bg-2 overflow-hidden">
        <div className="container rr-shape-p-c_1">
            <div className="row mb-60 align-items-center">
                <div className="col-xl-6">
                    <div className="section__title-wrapper text-center text-xl-start">
                        <h4 className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="left-separetor"></span>Our Catalog</h4>
                        <h2 className="section__title text-capitalize mb-0">Feature Products</h2>
                    </div>
                </div>
            </div>

            <div className="row mb-minus-30">
                {products.map((product) => (
                    <div key={product.id} className="col-xl-4 col-md-6 mb-30">
                        <div className="product-card d-flex flex-column">
                            <div className="product-card__image">
                                <img src={product.image || '/assets/imgs/what-we-do/what-we-do__item-1.png'} alt={product.name} />
                            </div>

                            <div className="product-card__content">
                                <div className="product-card__badge">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    Available Now
                                </div>
                                <h3 className="product-card__title">{product.name}</h3>
                                <p className="product-card__description">{product.description}</p>
                                <div className="product-card__price">₹{product.price}</div>
                                
                                <button onClick={() => handleOrder(product)} className="product-card__btn">
                                    Shop Now
                                    <span className="icon">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999999, display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', 
                    padding: '40px 20px', overflowY: 'auto'
                }}>
                    <div className="bg-white p-40" style={{backgroundColor: 'white', maxWidth: '500px', width: '100%', borderRadius: '10px', padding: '30px', position: 'relative', marginTop: '80px'}}>
                        <button onClick={() => setIsModalOpen(false)} style={{position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', fontSize: '20px', cursor: 'pointer'}}>&times;</button>
                        <h3 className="mb-10" style={{fontSize: '20px'}}>Confirm Your Order</h3>
                        <p className="mb-20" style={{fontSize: '14px'}}>Ordering: <strong>{selectedProduct.name}</strong> (₹{selectedProduct.price})</p>
                        
                        <div className="mb-15">
                            <label className="d-block mb-5" style={{fontSize: '14px', fontWeight: '500'}}>Name</label>
                            <input type="text" className="w-100" style={{border: '1px solid #ddd', padding: '8px 12px', borderRadius: '6px'}} 
                                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} placeholder="Your full name" />
                        </div>
                        <div className="mb-15">
                            <label className="d-block mb-5" style={{fontSize: '14px', fontWeight: '500'}}>Phone Number</label>
                            <input type="text" className="w-100" style={{border: '1px solid #ddd', padding: '8px 12px', borderRadius: '6px'}} 
                                value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} placeholder="WhatsApp Number" />
                        </div>
                        <div className="mb-15">
                            <label className="d-block mb-5" style={{fontSize: '14px', fontWeight: '500'}}>Address</label>
                            <textarea className="w-100" style={{border: '1px solid #ddd', padding: '8px 12px', borderRadius: '6px', minHeight: '80px'}} 
                                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} placeholder="Delivery Address"></textarea>
                        </div>
                        <div className="mb-20">
                            <label className="d-block mb-5" style={{fontSize: '14px', fontWeight: '500'}}>Quantity</label>
                            <input type="number" min="1" className="w-100" style={{border: '1px solid #ddd', padding: '8px 12px', borderRadius: '6px'}} 
                                value={customerInfo.quantity} onChange={(e) => setCustomerInfo({...customerInfo, quantity: parseInt(e.target.value)})} />
                        </div>

                        <div className="d-flex gap-10">
                            <button onClick={sendWhatsAppOrder} className="product-card__btn flex-grow-1" style={{width: '100%', borderRadius: '10px'}}>Confirm Order on WhatsApp</button>
                            <button onClick={() => setIsModalOpen(false)} style={{padding: '10px 20px', border: '1px solid #ddd', borderRadius: '10px'}}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </section>
  );
}
