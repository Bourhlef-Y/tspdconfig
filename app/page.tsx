import HomeClient from '@/components/HomeClient';

type PageProps = {
    params?: Promise<Record<string, string | string[]>>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home(props: PageProps) {
    // Next.js 15+ : résoudre params/searchParams côté serveur pour ne pas passer de Promises au client
    await Promise.all([
        props.params ?? Promise.resolve({}),
        props.searchParams ?? Promise.resolve({}),
    ]);
    return <HomeClient />;
}