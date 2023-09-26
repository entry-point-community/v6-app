import { HeadMetaData } from '~/components/HeadMetaData';

export default function Home() {
  return (
    <>
      <HeadMetaData
        ogImageUrl="https://cdn.discordapp.com/attachments/1050790741334569091/1151943122117480558/V6_Academy_Banner_Assets.png"
        metaDescription="Suplemen belajar lo, buat ilmu tech industry. Gak bermaksud jadi pengganti bootcamp ataupun kuliah. Hanya berharap jadi pelengkap aja."
      />
      <main className="container max-w-screen-md px-4">
        <h1 className="text-2xl font-semibold text-foreground">Home Page</h1>
      </main>
    </>
  );
}
