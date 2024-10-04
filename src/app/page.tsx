"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar"; // Import your loader
import { DATA } from "@/data/resume";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Markdown from "react-markdown";
import IconCloud from "@/components/magicui/icon-cloud";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useTheme } from "next-themes";
import ShineBorder from "@/components/magicui/shine-border";

const slugs = [
  "typescript", "javascript", "dart", "java", "react", "flutter", "android",
  "html5", "css3", "nodedotjs", "express", "nextdotjs", "prisma", "amazonaws",
  "postgresql", "firebase", "nginx", "vercel", "testinglibrary", "jest",
  "cypress", "docker", "git", "jira", "github", "gitlab", "visualstudiocode",
  "androidstudio", "sonarqube", "figma",
];

const BLUR_FADE_DELAY = 0.1;

export default function Page() {
  const [loading, setLoading] = useState(true); // Track loading state
  const [progress, setProgress] = useState(0); // Track progress for loader
  const [heroData, setHeroData] = useState<any>({});
  const [summary, setSummary] = useState("");
  const [workData, setWorkData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [contact, setContact] = useState<any>({});

  useEffect(() => {
    if (loading) {
      setProgress(0); // Reset progress to 0 when loading starts
      let progressValue = 0;
  
      // Increment progress every 50ms
      const interval = setInterval(() => {
        if (progressValue < 95) { // Cap progress at 95%, final 5% reserved for data fetching completion
          progressValue += 1;
          setProgress(Math.floor(progressValue)); // Use Math.floor() to ensure it's always an integer
        }
      }, 50); // Update progress every 50ms for a smooth visual effect
  
      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [loading]);
  

  // Minimum loader time, even if data loads quickly
  useEffect(() => {
    const minLoadingTime = 3000; // Set the minimum time for the loader (3 seconds)
    const startTime = Date.now(); // Record the start time

    const fetchData = async () => {
      try {
        const [
          heroRes,
          summaryRes,
          workRes,
          educationRes,
          skillsRes,
          projectsRes,
          hackathonsRes,
          contactRes,
        ] = await Promise.all([
          fetch("/api/hero").then((res) => res.json()),
          fetch("/api/summary").then((res) => res.json()),
          fetch("/api/work").then((res) => res.json()),
          fetch("/api/education").then((res) => res.json()),
          fetch("/api/skills").then((res) => res.json()),
          fetch("/api/projects").then((res) => res.json()),
          fetch("/api/hackathons").then((res) => res.json()),
          fetch("/api/contact").then((res) => res.json()),
        ]);

        // Simulate loader finishing after the remaining time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(minLoadingTime - elapsedTime, 0);

        setTimeout(() => {
          // Set all data and complete loading after the minimum duration
          setHeroData(heroRes);
          setSummary(summaryRes.summary);
          setWorkData(workRes.work);
          setEducationData(educationRes.education);
          setSkills(skillsRes.skills);
          setProjects(projectsRes.projects || []);
          setHackathons(hackathonsRes.hackathons);
          setContact(contactRes.contact);
          
          setProgress(100); // Complete the progress to 100%
          setLoading(false); // Stop loading after data is fetched
        }, remainingTime);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchData();
  }, []);

  const { theme } = useTheme(); // Access theme (dark or light)
  const [themeValue, setThemeValue] = useState<any>(theme)
  useEffect(()=>{
setThemeValue(theme)
  },[theme])
  // const { theme } = useTheme(); // Access theme (dark or light)
  console.log(theme, "hfhfhhfhf")

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {loading ? (
        // Show the animated circular progress bar when loading is true
        <div className="flex items-center justify-center min-h-[100dvh]">
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={Math.floor(progress)}
            gaugePrimaryColor="rgb(79 70 229)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
        </div>
      ) : (
        // Render the content once loading is false
        <>
          <section id="hero">
            <div className="mx-auto w-full max-w-screen-xl ">
              <div className="gap-2 flex justify-between items-center">
                <div className="flex-col flex flex-1 space-y-1.5">
                  <BlurFadeText
                    delay={BLUR_FADE_DELAY}
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    yOffset={8}
                    text={`Hi, I'm ${heroData.name || "there"} `}
                  />
                  <BlurFadeText
                    className="max-w-[600px] md:text-xl"
                    delay={BLUR_FADE_DELAY}
                    text={heroData.description || "Welcome to my site!"}
                  />
                </div>

                <BlurFade delay={BLUR_FADE_DELAY}>
                  <div className="hidden sm:flex relative h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-lg border-0  p-8">
                    {heroData.avatarUrl && (
                      <IconCloud iconSlugs={slugs} heroData={heroData} />
                    )}
                  </div>

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
          <BlurFade delay={BLUR_FADE_DELAY }>
            <ShineBorder
className="relative p-8 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl whitespace-pre-wrap text-center text-8xl md:mb-10"

              color={themeValue === "dark" ? "white" : "black"}
            >
              <Markdown className="prose max-w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent sans font-light">
                {summary}
              </Markdown>
            </ShineBorder>
            </BlurFade>
          </section>


      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 1}>
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
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
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
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
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
    <BlurFade delay={BLUR_FADE_DELAY * 3}>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
            My Projects
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Check out my latest work
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
          </p>
        </div>
      </div>
    </BlurFade>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
      {projects.slice(0, 4).map((project: any, id) => (
        <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
          <ProjectCard
            href={project.href}
            title={project.title}
            description={project.description}
            dates={project.dates}
            tags={project.technologies}
            image={project.image}
            gifUrl={project.gifUrl}
            links={project.links}
            youtubeLink={project.youtubeLink}
            githubLink={project.githubLink}
          />
        </BlurFade>
      ))}
    </div>
    <div className="text-center mt-6">
      <Link href="/allProjects" className="inline-block text-lg font-semibold px-6 py-3 rounded-md bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600 transition-colors">
        View All Projects
      </Link>
    </div>
  </div>
</section>

      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
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
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
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
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm { " "}
                {contact?.social?.LinkedIn?.url ? (
                  <Link
                    href={contact?.social?.LinkedIn?.url}
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
    
    </>
      )}
    </main>
  );
}