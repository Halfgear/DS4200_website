import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

// Function to fetch the blog post by its slug
async function getBlogPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter, content } = matter(fileContents);

  return { frontmatter, content };
}

// BlogPost component
export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params; // Await `params` to handle Promise type.

  const post = await getBlogPost(slug);

  if (!post) {
    notFound(); // Show 404 page if post not found
  }

  const { frontmatter, content } = post;

  return (
    <article className="max-w-[728px] mx-auto px-4">
      <header className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/me.jpg"
              alt="Author"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 font-medium">
                Joon Lee
              </span>
              <div className="flex items-center gap-2 text-sm">
                <time>
                  {new Date(frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </div>
        {frontmatter.coverImage && (
          <div className="mb-8">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              width={728}
              height={410}
              className="w-full aspect-[16/9] object-cover rounded-lg"
              priority
            />
          </div>
        )}
      </header>
      <section className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600">
        <ReactMarkdown>{content}</ReactMarkdown>
      </section>
    </article>
  );
}

// Static params generation
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''), // Remove the `.md` extension
  }));
}