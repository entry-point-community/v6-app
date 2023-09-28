import { useRef, useState } from 'react';
import Image from 'next/image';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useCreatePostMutation, useGetPostsQuery } from '@v6/api';

import { HeadMetaData } from '~/components/HeadMetaData';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { queryClient } from '~/lib/react-query';

const AuthShowcase = () => {
  const supabaseClient = useSupabaseClient();

  const handleSignInGithub = async () => {
    supabaseClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: '/hello-there',
      },
    });
  };

  return (
    <div className="text-center">
      <p className="font-semibold">
        You are not currently signed in.
        <br />
        Try signing in to create a post
      </p>

      <Button className="mt-4" onClick={handleSignInGithub}>
        Sign in with Github
      </Button>
    </div>
  );
};

const SignedInState = () => {
  const supabaseClient = useSupabaseClient();

  const handleLogout = () => {
    supabaseClient.auth.signOut();
  };

  return (
    <div className="text-center font-semibold">
      <p>
        You are now signed in! <br /> Try creating a post below.
      </p>
      <Button className="mt-2" onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    </div>
  );
};

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [postBody, setPostBody] = useState<string>('');
  const [postFile, setPostFile] = useState<File | undefined>(undefined);

  const user = useUser();

  const { data: posts } = useGetPostsQuery({});
  const { mutateAsync } = useCreatePostMutation({
    config: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['posts'],
        });

        setPostBody('');
        setPostFile(undefined);

        (inputFileRef.current as HTMLInputElement).value = '';
      },
    },
  });

  const handleSubmitPost = async () => {
    await mutateAsync({
      body: postBody,
      mediaFile: postFile,
    });
  };

  return (
    <>
      <HeadMetaData
        ogImageUrl="https://cdn.discordapp.com/attachments/1050790741334569091/1151943122117480558/V6_Academy_Banner_Assets.png"
        metaDescription="Fullstack monorepo"
      />
      <main className="container flex h-screen max-w-screen-md flex-col justify-between gap-4 px-4 py-16">
        <h1 className="text-center font-heading text-5xl font-bold text-primary">
          V6 Stack
        </h1>

        {user ? <SignedInState /> : <AuthShowcase />}

        <div className="flex flex-1 flex-col gap-4 overflow-y-scroll">
          {posts?.data.map((post) => (
            <Card key={post.id}>
              <CardHeader className="font-semibold">
                {post.author.userId}
              </CardHeader>
              <CardContent>
                {post.body}
                {!!post.mediaUrl && (
                  <AspectRatio className="mt-2" ratio={16 / 9}>
                    <Image
                      fill
                      src={`${post.mediaUrl}`}
                      alt={`${post.mediaUrl}`}
                    />
                  </AspectRatio>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {user && (
          <>
            <div className="flex gap-4">
              <Input
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                type="text"
                className="flex-1"
              />
              <Button onClick={handleSubmitPost}>Send</Button>
            </div>
            <input
              accept=".png,.jpg,.jpeg"
              ref={inputFileRef}
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setPostFile(e.target.files[0]);
                }
              }}
            />
          </>
        )}
      </main>
    </>
  );
}
