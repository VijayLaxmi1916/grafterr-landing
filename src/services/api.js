const CONTENT_URL = `${import.meta.env.BASE_URL}data/content.json`;

const randomDelay = () => 1000 + Math.floor(Math.random() * 500);

const fetchContent = () =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(CONTENT_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    }, randomDelay());
  });

export const fetchNavigation = () => fetchContent().then((data) => data.navigation);

export const fetchHeroContent = () => fetchContent().then((data) => data.hero);

export const fetchFeaturesContent = () =>
  fetchContent().then((data) => ({
    ...data.featuresSection,
    carousel: data.carousel,
  }));

export default {
  fetchNavigation,
  fetchHeroContent,
  fetchFeaturesContent,
};
