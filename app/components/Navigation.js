'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navigation() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">⚡</span>
                        </div>
                        <span className="text-white font-bold text-xl">BatteryUpgrade</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                            {t('nav.home')}
                        </Link>
                        <Link href="/#features" className="text-slate-300 hover:text-white transition-colors">
                            {t('nav.features')}
                        </Link>
                        <Link href="/order" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                            {t('nav.order')}
                        </Link>
                        <Link href="/#contact" className="text-slate-300 hover:text-white transition-colors">
                            {t('nav.contact')}
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-3 py-1 rounded transition-all ${language === 'en'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLanguage('ka')}
                            className={`px-3 py-1 rounded transition-all ${language === 'ka'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            ქარ
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
