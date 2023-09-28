import { useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useCreatePostMutation } from '@v6/api';

import { HeadMetaData } from '~/components/HeadMetaData';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';

const AuthShowcase = () => {
  const supabaseClient = useSupabaseClient();

  const onSignInGithub = async () => {
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

      <Button className="mt-4" onClick={onSignInGithub}>
        Sign in with Github
      </Button>
    </div>
  );
};

const SignedInState = () => {
  return (
    <div className="text-center font-semibold">
      <p>
        You are now signed in! <br /> Try creating a post below.
      </p>
    </div>
  );
};

export default function Home() {
  const user = useUser();

  const [postBody, setPostBody] = useState<string>('');

  const { mutateAsync } = useCreatePostMutation({});

  const onSubmitPost = async () => {
    await mutateAsync({
      body: postBody,
    });
  };

  return (
    <>
      <HeadMetaData
        ogImageUrl="https://cdn.discordapp.com/attachments/1050790741334569091/1151943122117480558/V6_Academy_Banner_Assets.png"
        metaDescription="Suplemen belajar lo, buat ilmu tech industry. Gak bermaksud jadi pengganti bootcamp ataupun kuliah. Hanya berharap jadi pelengkap aja."
      />
      <main className="container flex h-screen max-w-screen-md flex-col justify-between gap-4 px-4 py-16">
        <h1 className="text-center font-heading text-5xl font-bold text-primary">
          V6 Stack
        </h1>

        {user ? <SignedInState /> : <AuthShowcase />}

        <div className="flex flex-1 flex-col gap-4 overflow-y-scroll">
          {Array.from(
            [1, 1, 1, 1, 1, 1].map((val) => (
              <Card key={val}>
                <CardHeader className="font-semibold">theodevoid</CardHeader>
                <CardContent>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
                  corrupti eius dolorem totam culpa odio ex optio, aliquam est
                  qui.
                </CardContent>
              </Card>
            )),
          )}
        </div>

        <div className="flex gap-4">
          <Input
            onChange={(e) => setPostBody(e.target.value)}
            type="text"
            className="flex-1"
          />
          <Button onClick={onSubmitPost}>Send</Button>
        </div>
      </main>
    </>
  );
}
