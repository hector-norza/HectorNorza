import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

async function createBlogPost() {
  console.log('🚀 Creating a new blog post...\n');

  // Get blog post details
  const title = await askQuestion('Blog post title: ');
  const excerpt = await askQuestion('Brief excerpt (150-160 chars): ');
  const category =
    (await askQuestion(
      'Category (Product Management/Technology/Career/Leadership): '
    )) || 'Product Management';
  const tags = await askQuestion('Tags (comma-separated): ');

  const slug = createSlug(title);
  const date = getCurrentDate();
  const filename = `${slug}.md`;

  // Since your current setup uses the blogPosts array, let's update that instead
  await updateBlogPostsArray(title, excerpt, date, slug, category, tags);

  console.log(`\n✅ Blog post created successfully!`);
  console.log(`🔗 Slug: ${slug}`);
  console.log(`📅 Date: ${date}`);
  console.log(`\nNext steps:`);
  console.log(`1. Edit the blog post content in src/pages/Blog.tsx`);
  console.log(`2. Run: npm run build && npm run preview`);
  console.log(`3. Test at: http://localhost:4173/blog`);
  console.log(
    `4. Deploy: git add . && git commit -m "add: ${title}" && git push`
  );

  rl.close();
}

async function updateBlogPostsArray(
  title,
  excerpt,
  date,
  slug,
  category,
  tags
) {
  const blogPath = path.join('src', 'pages', 'Blog.tsx');

  if (fs.existsSync(blogPath)) {
    let content = fs.readFileSync(blogPath, 'utf8');

    // Find the blogPosts array and add the new post at the beginning
    const newPost = `  {
    id: ${Date.now()}, // Using timestamp as unique ID
    title: '${title}',
    excerpt: '${excerpt}',
    date: '${date}',
    slug: '${slug}',
    category: '${category}',
    tags: [${tags
      .split(',')
      .map((tag) => `'${tag.trim()}'`)
      .join(', ')}],
  },`;

    // Replace the blogPosts array
    const regex = /(const blogPosts = \[\s*)([\s\S]*?)(\s*\];)/;
    const match = content.match(regex);

    if (match) {
      const updatedArray = `${match[1]}${newPost}\n${match[2]}${match[3]}`;
      const updatedContent = content.replace(regex, updatedArray);
      fs.writeFileSync(blogPath, updatedContent);
      console.log(`📝 Updated Blog.tsx with new post`);
    } else {
      console.log(`⚠️  Could not find blogPosts array in Blog.tsx`);
      console.log(`Please manually add this post to the blogPosts array:`);
      console.log(newPost);
    }
  } else {
    console.log(`⚠️  Blog.tsx not found at ${blogPath}`);
  }
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

createBlogPost().catch(console.error);
