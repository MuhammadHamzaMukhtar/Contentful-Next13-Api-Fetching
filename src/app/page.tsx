import Image from "next/image";
import { Inter } from "next/font/google";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const inter = Inter({ subsets: ["latin"] });

async function getBlogs() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=blog`
  );

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();
  return (
    <main>
      {blogs.items.map((blog: any) => (
        <>
          <div>Blog Title: {blog.fields.title}</div>
          <div>
            Blog Description:
            {documentToReactComponents(blog.fields.description)}
          </div>
          {blogs.includes.Asset.map((asset: any) => (
            <>
              <div>
                {asset.sys.id === blog.fields.image.sys.id && (
                  <Image
                    src={`https:${asset.fields.file.url}`}
                    alt={asset.fields.title}
                    width={100}
                    height={100}
                  />
                )}
              </div>
            </>
          ))}
          {blogs.includes.Entry.map((entry: any) => (
            <>
              {blog.fields.createdBy.sys.id === entry.sys.id && (
                <div>
                  <p>Author: {entry.fields.name}</p>
                  <p>Author Image: </p>
                  {blogs.includes.Asset.map((asset: any) => (
                    <>
                      {entry.fields.image.sys.id === asset.sys.id && (
                        <Image
                          src={`https:${asset.fields.file.url}`}
                          alt={asset.fields.file.fileName}
                          width={100}
                          height={100}
                        />
                      )}
                    </>
                  ))}
                </div>
              )}
            </>
          ))}
        </>
      ))}
    </main>
  );
}
