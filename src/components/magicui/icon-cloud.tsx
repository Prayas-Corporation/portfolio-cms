"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";
import { Avatar, AvatarImage } from "../ui/avatar";

// Cloud properties
export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      position: "relative",
      perspective: "1000px", // Create a 3D perspective effect
    },
  },
  options: {
    reverse: true,
    depth: 0.8, // Increase depth for a more pronounced 3D effect
    wheelZoom: false,
    imageScale: 2.5, // Increase scale for a more immersive feel
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#262626",
    maxSpeed: 0.05, // Increase speed for faster rotation
    minSpeed: 0.02,
  },
};

// Function to render custom icons
export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

// Props and data type definition
export type DynamicCloudProps = {
  iconSlugs: string[];
  heroData: {
    name: string;
    avatarUrl: string;
  };
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs, heroData }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const { theme } = useTheme();

  // Fetch SimpleIcons data
  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  // Render icons once the data is fetched
  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light")
    );
  }, [data, theme]);

  return (
    <div style={{ position: "relative", width: "100%", height: "236px", perspective: "800px" }}>
      {/* Centered Avatar Image */}
      {heroData.avatarUrl && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 0, // Ensure avatar is above the cloud but behind rotating icons
            width: "100px", // Adjust size as necessary
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "transparent", // Optional: Background color for the avatar container
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar className="size-32 border">
            <AvatarImage alt={heroData.name} src={heroData.avatarUrl} />
          </Avatar>
        </div>
      )}

      {/* Cloud Icons */}
      <Cloud {...cloudProps}>
        {Array.isArray(renderedIcons) ? renderedIcons : [renderedIcons]}
      </Cloud>
    </div>
  );
}
