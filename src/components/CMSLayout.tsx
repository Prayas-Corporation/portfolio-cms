import Link from 'next/link';

export default function CMSLayout({ children }:any) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-1/4 bg-gray-800 text-white p-6">
        <ul className="space-y-4">
          <li>
            <Link href="/cms/hero">Hero Section</Link>
          </li>
          <li>
            <Link href="/cms/summary">Summary</Link>
          </li>
          <li>
            <Link href="/cms/work">Work Experience</Link>
          </li>
          <li>
            <Link href="/cms/education">Education</Link>
          </li>
          <li>
            <Link href="/cms/skills">Skills</Link>
          </li>
          <li>
            <Link href="/cms/projects">Projects</Link>
          </li>
          <li>
            <Link href="/cms/hackathons">Hackathons</Link>
          </li>
          <li>
            <Link href="/cms/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <main className="w-3/4 p-6">{children}</main>
    </div>
  );
}
