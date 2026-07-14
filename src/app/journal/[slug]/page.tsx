import Link from 'next/link';

export default function JournalPost({ params }: { params: { slug: string } }) {
  // Mock content for demo purposes
  const getPost = (slug: string) => {
    switch (slug) {
      case 'the-story-of-the-baiji':
        return {
          title: 'The Story of the Baiji',
          date: 'Aug 14, 2026',
          content: [
            "Declared functionally extinct in 2006, the Yangtze River Dolphin was a casualty of rapid industrialization. For millions of years, they navigated the murky waters of the Yangtze using sophisticated echolocation. But as the river became a massive artery for trade, the noise of engines blinded them. Nets drowned them. Pollution poisoned them.",
            "We dedicate our first edition to the Baiji because it represents the silent cost of our modern convenience. When we decided to launch Vanara, we knew our first silhouette had to carry this weight.",
            "The shoe's colorway—a stark bone white against a pale river blue—mirrors the dolphin's own colors. But we didn't just want a tribute in color. We etched a topographic map of a 50-mile stretch of the Yangtze into the midsole. It's a subtle detail, something only the wearer will know is there, a private reminder of what was lost.",
            "By wearing this piece, you carry the record forward."
          ]
        };
      case 'why-we-stamp-every-pair':
        return {
          title: 'Why We Hand-Stamp Every Pair',
          date: 'Aug 02, 2026',
          content: [
            "Mass production removes the soul from footwear. When a factory pumps out two million pairs of a sneaker, the product becomes entirely divorced from the people who made it.",
            "At Vanara, we believe that true luxury lies in the imperfect, human touch. That is why every single pair of our editions is hand-stamped with its unique edition number in our studio.",
            "When you see 'No. 014 / 200' stamped on the inner tag of your shoe, you know that a human being aligned the stamp, pressed it into the fabric, and verified it. We document this process because transparency is the foundation of trust. We don't just claim our shoes are limited; we physically guarantee it on every pair we ship out.",
            "It is a tedious process. It doesn't scale. And that is exactly why we do it."
          ]
        };
      case 'sustainable-materials':
        return {
          title: 'Our Material Philosophy',
          date: 'Jul 28, 2026',
          content: [
            "You cannot create a product meant to honor nature while simultaneously destroying it. From day one, the hardest part of building Vanara was sourcing the materials.",
            "We spent eight months visiting factories and suppliers. We rejected dozens of traditional foams and synthetic leathers because their manufacturing processes dumped toxic runoff into local waterways.",
            "The Baiji Edition uses an organic cotton canvas that requires 71% less water than standard cotton. The river-blue soles are poured using a proprietary blend that incorporates 40% recycled natural rubber, harvested without deforestation.",
            "We don't believe in fast fashion. We believe in creating durable artifacts that tell a story, built in a way that ensures there are still stories left to tell."
          ]
        };
      default:
        return null;
    }
  };

  const post = getPost(params.slug);

  if (!post) {
    return (
      <main className="va-view active" style={{ minHeight: '80vh', padding: '10vh 6vw', textAlign: 'center' }}>
        <h1 className="serif" style={{ fontSize: '32px', color: 'var(--brick)' }}>Record Not Found</h1>
        <Link href="/journal" className="va-btn" style={{ marginTop: '24px', display: 'inline-block' }}>Return to Journal</Link>
      </main>
    );
  }

  return (
    <main className="va-view active" style={{ minHeight: '80vh', padding: '10vh 6vw' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Link href="/journal" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--bone-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', display: 'inline-block', margin: '0 0 40px 0' }}>
          &larr; Back to Notes
        </Link>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--river)', marginBottom: '16px' }}>
          {post.date}
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '40px', lineHeight: '1.2' }}>{post.title}</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {post.content.map((paragraph, idx) => (
            <p key={idx} style={{ color: 'var(--bone-dim)', fontSize: '16px', lineHeight: '1.8' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
