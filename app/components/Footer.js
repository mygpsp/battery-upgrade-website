'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">⚡</span>
                            </div>
                            <span className="text-white font-bold text-xl">BatteryUpgrade</span>
                        </div>
                        <p className="text-slate-400">{t('footer.tagline')}</p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">{t('contact.title')}</h3>
                        <div className="space-y-2 text-slate-400">
                            <p>{t('contact.email')}: info@batteryupgrade.ge</p>
                            <p>{t('contact.phone')}: +995 555 123 456</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">{t('footer.links.contact')}</h3>
                        <div className="space-y-2">
                            <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                                {t('footer.links.privacy')}
                            </a>
                            <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                                {t('footer.links.terms')}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
                    <p>© {currentYear} BatteryUpgrade. {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
}
