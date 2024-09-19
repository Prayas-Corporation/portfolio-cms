"use client";

import { useEffect, useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  const [contact, setContact] = useState(DATA.contact); // Initialize state with static data

  useEffect(() => {
    // Fetch dynamic contact data from API
    fetch("/api/contact")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "Response data");
  
        // Access `data.contact.social` since `social` is inside `contact`
        if (data && data.contact && data.contact.social) {
          // Merge fetched URLs into existing static data
          setContact((prevContact) => ({
            ...prevContact,
            social: {
              ...prevContact.social,
              GitHub: { ...prevContact.social.GitHub, url: data.contact.social.GitHub?.url || prevContact.social.GitHub.url },
              LinkedIn: { ...prevContact.social.LinkedIn, url: data.contact.social.LinkedIn?.url || prevContact.social.LinkedIn.url },
              X: { ...prevContact.social.X, url: data.contact.social.X?.url || prevContact.social.X.url },
              Youtube: { ...prevContact.social.Youtube, url: data.contact.social.Youtube?.url || prevContact.social.Youtube.url },
            },
          }));
        }
      })
      .catch((error) => console.error("Error fetching contact data:", error));
  }, []);
  

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full  to-transparent  "></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background transform-gpu dark:[border:1px solid rgba(255,255,255,.1)] ">
        
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={item.href} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12")}>
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <Separator orientation="vertical" className="h-full" />

        {/* Display social media icons dynamically from the fetched contact data */}
        {Object.entries(contact.social)
          .filter(([_, social]) => social.url) // Only display platforms with URLs
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={social.url} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12")}>
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

        <div className="h-full py-2" />

        {/* <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
            
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon> */}
      </Dock>
    </div>
  );
}
