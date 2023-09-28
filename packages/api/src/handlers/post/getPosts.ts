import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Prisma } from '@v6/db';
import defaultAxios, { AxiosPromise } from 'axios';

import { ApiFn, ExtractFnReturnType, QueryConfig } from '~/lib/react-query';
import { useApiClient } from '~/providers';

const postsWithAuthor = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    author: true,
  },
});

export type PostsWithAuthor = Prisma.PostGetPayload<typeof postsWithAuthor>;

export const getPosts: ApiFn<{}, AxiosPromise<PostsWithAuthor[]>> = (
  {},
  { axios = defaultAxios },
) => {
  return axios.get('/posts');
};

type QueryFnType = typeof getPosts;

type UseGetPostsQueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetPostsQuery = ({ config }: UseGetPostsQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryFn: () => getPosts({}, { axios }),
    queryKey: ['posts'],
    ...config,
  });
};
