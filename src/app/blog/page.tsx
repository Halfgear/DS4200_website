import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt?: string;
    coverImage?: string;
  };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContents);

    return {
      slug,
      frontmatter: frontmatter as BlogPost['frontmatter'],
    };
  });

  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent leading-tight py-1">
        Thoughts & Stories
      </h1>
      <div className="grid divide-y-2 divide-neutral-200">
        {posts.map((post) => (
          <article key={post.slug} className="flex gap-6 items-center py-8 first:pt-0 last:pb-0">
            <div className="flex-grow">
              <Link href={`/blog/${post.slug}`} className="space-y-2">
                <h2 className="text-xl font-bold">{post.frontmatter.title}</h2>
                {post.frontmatter.excerpt && (
                  <p className="text-gray-700 line-clamp-2">{post.frontmatter.excerpt}</p>
                )}
              </Link>
            </div>
            {post.frontmatter.coverImage && (
              <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
                <Image
                  src={post.frontmatter.coverImage}
                  alt={post.frontmatter.title}
                  width={200}
                  height={134}
                  className="w-[200px] h-[134px] object-cover rounded-md"
                />
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
