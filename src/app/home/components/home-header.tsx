import FilterSelector from './filter-selector';
import FilterView from './filter-view';

export default function HomeHeader(): JSX.Element {
  return (
    <div className="flex w-full flex-row px-0 pb-4 md:px-4">
      <FilterSelector />
      <FilterView />
    </div>
  );
}
