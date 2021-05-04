const build: string = 'PRO';

interface Object {
  API_BASE_URL: string;
  COUNTRIES: Array<{
    name: string;
    value: string;
  }>;
}

let Global: Object = {
  API_BASE_URL:
    build === 'DEV' ? 'http://localhost:9776' : 'https://api.irpishbini.ir',
  COUNTRIES: [
    { name: 'ایران', value: 'iran' },
    { name: 'انگلیس', value: 'england' },
    { name: 'آلمان', value: 'germany' },
    { name: 'ایتالیا', value: 'italy' },
    { name: 'فرانسه', value: 'france' },
    { name: 'اسپانیا', value: 'spain' },
    { name: 'سسس', value: 'sss' },
  ],
};

export default Global;
