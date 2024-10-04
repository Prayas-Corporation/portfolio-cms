"use client";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { useEffect, useState } from "react";

const BLUR_FADE_DELAY = 0.04;

export default function BlogPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const minLoadingTime = 3000; // Set the minimum time for the loader (3 seconds)
    const startTime = Date.now(); // Record the start time

    const fetchProjects = async () => {
      try {
        // Fetching only the projects data from your API
        const response = await fetch("/api/projects");
        const projectsRes = await response.json();
  
        // Simulate loader finishing after the remaining time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(minLoadingTime - elapsedTime, 0);
  
        setTimeout(() => {
          // Set projects data after the minimum loading time has elapsed
          setProjects(projectsRes.projects || []);
        }, remainingTime);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section>
      
    
        <div className="space-y-12 w-full ">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
               
               
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3  ">

            {projects.map((project:any, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
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
        </div>
      </section>
    
  );
}
