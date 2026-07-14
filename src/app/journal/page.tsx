import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal | VANARA',
  description: 'Field notes, stories, and the history of the species we aim to honor.',
};

export default function JournalPage() {
  const posts = [
    {
      slug: 'the-story-of-the-baiji',
      title: 'The Story of the Baiji',
      excerpt: 'Declared functionally extinct in 2006, the Yangtze River Dolphin was a casualty of rapid industrialization. Here is why we dedicated our first edition to it.',
      date: 'Aug 14, 2026',
    },
    {
      slug: 'why-we-stamp-every-pair',
      title: 'Why We Hand-Stamp Every Pair',
      excerpt: 'Mass production removes the soul from footwear. We believe that true luxury lies in the imperfect, human touch of a hand-stamped edition number.',
      date: 'Aug 02, 2026',
    },
    {
      slug: 'sustainable-materials',
      title: 'Our Material Philosophy',
      excerpt: 'A look into the sourcing of our organic cottons, recycled rubbers, and the ethical factories that bring Vanara blueprints to life.',
      date: 'Jul 28, 2026',
    }
  ];

  return (
    <main className="va-view active" style={{ minHeight: '80vh', padding: '10vh 6vw' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 className="serif" style={{ fontSize: 'clamp(36px, 6vw, 60px)', marginBottom: '16px' }}>Field Notes.</h1>
        <p style={{ color: 'var(--bone-dim)', fontSize: '16px', marginBottom: '60px', maxWidth: '40ch' }}>
          Documenting our process, our inspiration, and the stories of the species we honor.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {posts.map((post) => (
            <article key={post.slug} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '40px' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--river)', marginBottom: '12px' }}>
                {post.date}
              </div>
              <h2 className="serif" style={{ fontSize: '28px', marginBottom: '12px', color: 'var(--bone)' }}>
                <Link href={`/journal/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {post.title}
                </Link>
              </h2>
              <p style={{ color: 'var(--bone-dim)', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', maxWidth: '60ch' }}>
                {post.excerpt}
              </p>
              <Link 
                href={`/journal/${post.slug}`} 
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--bone)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--bone)', paddingBottom: '2px', textDecoration: 'none' }}
              >
                Read entry &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
