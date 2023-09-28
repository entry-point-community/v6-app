import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Prisma } from '@v6/db';
import { CreatePostDTO } from '@v6/dto';
import defaultAxios, { AxiosPromise } from 'axios';

import { ApiFn, MutationConfig } from '~/lib/react-query';
import { useApiClient } from '~/providers';

const post = Prisma.validator<Prisma.PostDefaultArgs>()({});

export type Post = Prisma.PostGetPayload<typeof post>;

export const createPost: ApiFn<
  CreatePostDTO & { mediaFile?: File },
  AxiosPromise<Post>
> = (createPostDTO, { axios = defaultAxios }) => {
  return axios.post('/posts', createPostDTO, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type MutationFnType = typeof createPost;

type UseCreatePostMutationOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useCreatePostMutation = ({
  config = {},
}: UseCreatePostMutationOptions) => {
  const { axios } = useApiClient();

  return useMutation({
    ...config,
    mutationFn: ({ body, mediaFile }) => {
      const formData = new FormData();

      formData.append('body', body);

      if (mediaFile) {
        formData.append('post-media', mediaFile);
      }

      return createPost(
        formData as unknown as CreatePostDTO & { mediaFile?: File },
        { axios },
      );
    },
  });
};
