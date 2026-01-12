'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { Suspense } from 'react';

function OrderSuccessContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                        <span className="text-5xl">✓</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        {t('orderSuccess.title')}
                    </h1>
                    <p className="text-xl text-slate-300">
                        {t('orderSuccess.thankYou')}
                    </p>
                </div>

                {/* Order ID */}
                <div className="glass p-6 rounded-xl mb-8 text-center">
                    <p className="text-slate-400 mb-2">{t('orderSuccess.orderId')}</p>
                    <p className="text-3xl font-bold gradient-text">{orderId}</p>
                </div>

                {/* Next Steps */}
                <div className="glass p-8 md:p-12 rounded-2xl mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-blue-400">
                        {t('orderSuccess.nextSteps')}
                    </h2>

                    <div className="space-y-6">
                        {[
                            { key: 'step1', icon: '📦' },
                            { key: 'step2', icon: '🏷️' },
                            { key: 'step3', icon: '🚚' },
                            { key: 'step4', icon: '📧' }
                        ].map((step, index) => (
                            <div key={step.key} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                                    {step.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        {index + 1}. {t(`orderSuccess.${step.key}Title`)}
                                    </h3>
                                    <p className="text-slate-300">
                                        {t(`orderSuccess.${step.key}Description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="glass p-8 rounded-xl mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-blue-400">
                        {t('orderSuccess.shippingAddress')}
                    </h2>
                    <div className="text-slate-300 space-y-1">
                        <p className="font-semibold">{t('orderSuccess.addressLine1')}</p>
                        <p>{t('orderSuccess.addressLine2')}</p>
                        <p>{t('orderSuccess.addressLine3')}</p>
                        <p>{t('orderSuccess.addressLine4')}</p>
                    </div>
                </div>

                {/* Back to Home Button */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="btn-primary inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
                    >
                        {t('orderSuccess.backHome')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={
            <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading...</p>
                </div>
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    );
}
