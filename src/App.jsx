import { useCallback } from 'react';
import useContent from './hooks/useContent';
import { fetchNavigation, fetchHeroContent, fetchFeaturesContent } from './services/api';
import Navigation from './components/sections/Navigation';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import ErrorState from './components/ui/ErrorState';
import appStyles from './App.module.css';

function App() {
  const navigation = useContent(useCallback(() => fetchNavigation(), []));
  const hero = useContent(useCallback(() => fetchHeroContent(), []));
  const features = useContent(useCallback(() => fetchFeaturesContent(), []));

  return (
    <div className={appStyles.shell}>
      <Navigation data={navigation.data} loading={navigation.status === 'loading'} />

      <main>
        {hero.status === 'error' ? (
          <div className={appStyles.errorWrap}>
            <ErrorState
              title="We couldn't load the hero content"
              message={hero.error?.message ?? 'Please check your connection and try again.'}
              onRetry={hero.retry}
            />
          </div>
        ) : (
          <HeroSection data={hero.data} loading={hero.status === 'loading'} />
        )}

        {features.status === 'error' ? (
          <div className={appStyles.errorWrap}>
            <ErrorState
              title="We couldn't load our products"
              message={features.error?.message ?? 'Please check your connection and try again.'}
              onRetry={features.retry}
            />
          </div>
        ) : (
          <FeaturesSection data={features.data} loading={features.status === 'loading'} />
        )}
      </main>

      <footer className={appStyles.footer}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Grafterr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
