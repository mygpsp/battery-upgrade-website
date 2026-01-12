'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

export default function OrderPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        quantity: 1
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('order.validation.nameRequired');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('order.validation.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('order.validation.emailInvalid');
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('order.validation.phoneRequired');
        }

        if (!formData.address.trim()) {
            newErrors.address = t('order.validation.addressRequired');
        }

        if (formData.quantity < 1) {
            newErrors.quantity = t('order.validation.quantityMin');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // TODO: Replace with your actual Cloud Function URL after deployment
            const cloudFunctionUrl = process.env.NEXT_PUBLIC_ORDER_FUNCTION_URL || 'http://localhost:8080';

            const response = await fetch(cloudFunctionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit order');
            }

            // Redirect to success page with order ID
            router.push(`/order-success?orderId=${data.orderId}`);
        } catch (err) {
            console.error('Order submission error:', err);
            setError(t('order.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? parseInt(value) || 1 : value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        {t('order.title')}
                    </h1>
                    <p className="text-xl text-slate-300">
                        {t('order.subtitle')}
                    </p>
                </div>

                <div className="glass p-8 md:p-12 rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-blue-400 mb-2">
                                {t('order.form.name')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('order.form.namePlaceholder')}
                                className={`w-full px-4 py-3 bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-slate-700'
                                    } rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-blue-400 mb-2">
                                {t('order.form.email')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t('order.form.emailPlaceholder')}
                                className={`w-full px-4 py-3 bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-700'
                                    } rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-blue-400 mb-2">
                                {t('order.form.phone')}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder={t('order.form.phonePlaceholder')}
                                className={`w-full px-4 py-3 bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-slate-700'
                                    } rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white`}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                            )}
                        </div>

                        {/* Address Field */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-blue-400 mb-2">
                                {t('order.form.address')}
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder={t('order.form.addressPlaceholder')}
                                rows="3"
                                className={`w-full px-4 py-3 bg-slate-800 border ${errors.address ? 'border-red-500' : 'border-slate-700'
                                    } rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white resize-none`}
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-400">{errors.address}</p>
                            )}
                        </div>

                        {/* Quantity Field */}
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-semibold text-blue-400 mb-2">
                                {t('order.form.quantity')}
                            </label>
                            <p className="text-sm text-slate-400 mb-2">{t('order.form.quantityLabel')}</p>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                value={formData.quantity}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-slate-800 border ${errors.quantity ? 'border-red-500' : 'border-slate-700'
                                    } rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white`}
                            />
                            {errors.quantity && (
                                <p className="mt-1 text-sm text-red-400">{errors.quantity}</p>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
                                <p className="text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? t('order.form.submitting') : t('order.form.submit')}
                        </button>
                    </form>
                </div>

                {/* Pricing Info */}
                <div className="mt-8 text-center text-slate-400">
                    <p className="text-sm">
                        {t('pricing.price')} {t('pricing.perBattery')} × {formData.quantity} =
                        <span className="text-2xl font-bold gradient-text ml-2">
                            ${149 * formData.quantity}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
