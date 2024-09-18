"use client";
import { DATA } from "@/data/resume";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import IconCloud from "@/components/magicui/icon-cloud";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useTheme } from "next-themes";
import ShineBorder from "@/components/magicui/shine-border";
const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const BLUR_FADE_DELAY = 0.4;

export default function Page() {
  const [heroData, setHeroData] = useState<any>({});
  const [summary, setSummary] = useState("");
  const [workData, setWorkData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [contact, setContact] = useState<any>({});

  useEffect(() => {
    fetch("/api/hero")
      .then((response) => response.json())
      .then((data) => setHeroData(data))
      .catch((error) =>
        console.error("Error fetching hero section data:", error)
      );

    fetch("/api/summary")
      .then((response) => response.json())
      .then((data) => setSummary(data.summary))
      .catch((error) => console.error("Error fetching summary data:", error));

    fetch("/api/work")
      .then((response) => response.json())
      .then((data) => setWorkData(data.work))
      .catch((error) => console.error("Error fetching work data:", error));

    fetch("/api/education")
      .then((response) => response.json())
      .then((data) => setEducationData(data.education))
      .catch((error) => console.error("Error fetching education data:", error));

    fetch("/api/skills")
      .then((response) => response.json())
      .then((data) => setSkills(data.skills))
      .catch((error) => console.error("Error fetching skills data:", error));

    fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "chhhhhhhhhhhh"); // Check if videoUrl is present
        setProjects(data.projects || []);
      })
      .catch((error) => console.error("Error fetching projects data:", error));

    fetch("/api/hackathons")
      .then((response) => response.json())
      .then((data) => setHackathons(data.hackathons))
      .catch((error) =>
        console.error("Error fetching hackathons data:", error)
      );

    fetch("/api/contact")
      .then((response) => response.json())
      .then((data) => setContact(data.contact))
      .catch((error) => console.error("Error fetching contact data:", error));
  }, []);
  console.log(contact, "dsdsdsdssddssdsd");
  const { theme } = useTheme(); // Access theme (dark or light)
  const [themeValue, setThemeValue] = useState<any>(theme)
  useEffect(()=>{
setThemeValue(theme)
  },[theme])
  // const { theme } = useTheme(); // Access theme (dark or light)
  console.log(theme, "hfhfhhfhf")
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-screen-xl space-y-8">
          <div className="gap-2 flex justify-between items-center">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${heroData.name || "there"} `}
                // 👋
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={heroData.description || "Welcome to my site!"}
              />
            </div>

            <BlurFade delay={BLUR_FADE_DELAY}>
              {/* <AvatarImage alt={heroData.name} src={heroData.avatarUrl} /> */}
              {/* Render container only for screens larger than 545px */}
              <div className="hidden sm:flex relative h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-lg border-0 bg-background p-8">
                {heroData.avatarUrl && (
                  <IconCloud iconSlugs={slugs} heroData={heroData} />
                )}
              </div>

              {/* Render Avatar for screens smaller than 545px */}
              <div className="flex sm:hidden items-center justify-center">
                {heroData.avatarUrl && (
                  <Avatar className="size-28 border">
                    <AvatarImage alt={heroData.name} src={heroData.avatarUrl} />
                    <AvatarFallback>{heroData.initials}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about" >
        {/* <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold mb-1">About</h2>
        </BlurFade> */}
        {/* <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {summary}
          </Markdown>
        </BlurFade> */}

        {/* <BlurFade delay={BLUR_FADE_DELAY * 4}>
 <ShineBorder
      
        color={theme === "dark" ? "white" : "black"} // Adjust ShineBorder color based on theme
      >
         <Markdown className="pointer-events-none whitespace-pre-wrap text-center  leading-none prose max-w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent sans text-sm font-light">
                {summary}

              </Markdown>
            
      </ShineBorder>
      </BlurFade> */}

        {/* <ShineBorder
          className="relative  p-8 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl whitespace-pre-wrap text-center text-8xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <Markdown className="prose max-w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent sans font-light">
            {summary}
          </Markdown>
        </ShineBorder> */}


        <ShineBorder
         className="relative  p-8 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl whitespace-pre-wrap text-center text-8xl"

        color={themeValue === "dark" ? "black" : "white"} // Adjust ShineBorder color based on theme
      >
      <Markdown className="prose max-w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent sans font-light">
            {summary}
          </Markdown>
    </ShineBorder>



        {/* <div className="relative flex p-8 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <Markdown className="prose max-w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent sans text-sm font-light">
                {summary}
              </Markdown>
            </BlurFade>
          </span>
          <BorderBeam size={250} duration={12} delay={9} />
        </div> */}
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {workData.map((work: any, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {educationData.map((education: any, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {projects.map((project: any, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  gifUrl={project.gifUrl} // Pass gifUrl to ProjectCard
                  links={project.links}
                  youtubeLink={project.youtubeLink} // Pass YouTube link
                  githubLink={project.githubLink}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Licenses & Certificate.
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Certified Skills & Expertise
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I have earned licenses and certifications over the years.
                  These certifications have helped me develop a deep
                  understanding of various technologies and domains.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {hackathons.map((project: any, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm { " "}
                {contact?.social?.Youtube?.url ? (
                  <Link
                    href={contact.social.LinkedIn.url}
                    className="text-blue-500 hover:underline"
                  >
                    with a direct question on LinkedIn
                  </Link>
                ) : (
                  <span> with a direct question on LinkedIn {" "}</span> // Fallback in case the URL is undefined
                )}
                {" "} and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
