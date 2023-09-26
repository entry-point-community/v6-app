import { PropsWithChildren } from 'react';

const TimelineContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {children}
    </ol>
  );
};

const TimelineItem: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <li className="mb-10 ml-4">
      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {children}
      </h3>
    </li>
  );
};

export { TimelineContainer, TimelineItem };
