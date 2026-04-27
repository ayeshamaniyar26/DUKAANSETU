'use client';
import { useState } from 'react';
import { submitInquiry } from '@/app/actions/inquiry';
import Swal from 'sweetalert2';

export default function RequestQuote({ store }) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const res = await submitInquiry(formData);

        if (res.success) {
            Swal.fire({
                title: 'Success!',
                text: 'Your inquiry has been submitted successfully. We will get back to you soon!',
                icon: 'success',
                confirmButtonColor: '#2E7D32'
            });
            e.target.reset();
        } else {
            Swal.fire({
                title: 'Error',
                text: res.error,
                icon: 'error',
                confirmButtonColor: '#2E7D32'
            });
        }
        setLoading(false);
    }

    return (
        <section className="request-a-quote" id="contact">
            <div className="container">
                <div className="col-12">
                    <div className="request-a-quote__box request-a-quote__box-up d-flex flex-column flex-xl-row align-items-center">
                        <div className="request-a-quote__left">
                            <div className="request-a-quote__left-bg rr-upDown" style={{background: 'url(/assets/imgs/request-quote/bg.png)'}}></div>
                            <div className="section__title-wrapper text-center text-xl-start">
                                <span className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="left-separetor"></span>Lets Talk</span>
                                <h2 className="section__title title-animation mb-20">Have a Big Order or Query? Contact With Us</h2>
                                <p className="des mb-35">Whether you want to order in bulk for a function or have questions about our monthly ration plans, we are here to help.</p>

                                <div className="request-a-quote__meta d-flex align-items-center justify-content-center justify-content-xl-start">
                                    <div className="request-a-quote__meta-img">
                                        <img src="/assets/imgs/request-quote/author-img.jpg" alt="" />
                                    </div>
                                    <div className="request-a-quote__meta-content">
                                        <h5 className="title">{store.name} Support</h5>
                                        <span className="position">Owner Assistant</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="request-a-quote__right">
                            <form className="request-a-quote__form" onSubmit={handleSubmit}>
                                <h3 className="text-center mb-30">Send Inquiry</h3>
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="request-a-quote__form-input">
                                            <input type="text" name="name" placeholder="Your Name" required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="request-a-quote__form-input">
                                            <input type="tel" name="phone" placeholder="Phone Number" required />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="request-a-quote__form-input textarea">
                                            <textarea name="message" placeholder="Order Details or Inquiry" required></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="rr-btn" disabled={loading}>
                                            <span className="btn-wrap">
                                                <span className="text-one">{loading ? 'Submitting...' : 'Submit Message'}</span>
                                                <span className="text-two">{loading ? 'Submitting...' : 'Submit Message'}</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
