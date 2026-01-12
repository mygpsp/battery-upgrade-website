'use client';

import Link from 'next/link';
import { useLanguage } from './contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">{t('hero.title')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/order"
                className="btn-primary bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                {t('hero.cta')}
              </Link>
              <a
                href="#features"
                className="glass px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800/70 transition-all"
              >
                {t('hero.learnMore')}
              </a>
            </div>
          </div>

          {/* Floating battery illustration */}
          <div className="mt-16 animate-float">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl animate-pulse-glow flex items-center justify-center">
              <span className="text-8xl">🔋</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t('features.title')}
            </h2>
            <p className="text-xl text-slate-300">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '⚡', key: 'capacity' },
              { icon: '🏆', key: 'quality' },
              { icon: '✅', key: 'warranty' },
              { icon: '🌱', key: 'eco' }
            ].map((feature, index) => (
              <div
                key={feature.key}
                className="glass p-6 rounded-xl card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-400">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="text-slate-300">
                  {t(`features.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-slate-300">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['step1', 'step2', 'step3'].map((step, index) => (
              <div key={step} className="relative">
                <div className="glass p-8 rounded-xl card-hover text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                    {t(`howItWorks.${step}.title`)}
                  </h3>
                  <p className="text-slate-300">
                    {t(`howItWorks.${step}.description`)}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-purple-500">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t('pricing.title')}
            </h2>
          </div>

          <div className="glass p-8 md:p-12 rounded-2xl max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold gradient-text mb-2">
                {t('pricing.price')}
              </div>
              <div className="text-slate-400">{t('pricing.perBattery')}</div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                {t('pricing.includes')}
              </h3>
              <ul className="space-y-3">
                {['feature1', 'feature2', 'feature3', 'feature4', 'feature5'].map((feature) => (
                  <li key={feature} className="flex items-center text-slate-300">
                    <span className="text-green-400 mr-3">✓</span>
                    {t(`pricing.${feature}`)}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/order"
              className="btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all block text-center"
            >
              {t('nav.order')}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            {t('contact.subtitle')}
          </p>
          <div className="glass p-8 rounded-xl inline-block">
            <div className="space-y-4 text-left">
              <div>
                <span className="text-blue-400 font-semibold">{t('contact.email')}:</span>
                <span className="ml-2 text-slate-300">info@batteryupgrade.ge</span>
              </div>
              <div>
                <span className="text-blue-400 font-semibold">{t('contact.phone')}:</span>
                <span className="ml-2 text-slate-300">+995 555 123 456</span>
              </div>
              <div>
                <span className="text-blue-400 font-semibold">{t('contact.address')}:</span>
                <span className="ml-2 text-slate-300">Tbilisi, Georgia</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
