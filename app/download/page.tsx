"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import Image from "next/image";
import { Download, ChevronDown, ChevronUp, GitCommit, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";

const downloadData = {
  title: "DOWNLOADS",
  editions: [
    {
      title: "PS4 Edition",
      description: "Bypass for cross-platform functionality",
      imageUrl: "/goldhen.png",
      features: [
        "Cross-platform play",
        "Basic server access",
        "Performance optimizations",
      ],
      buttonText: "Download",
      changelogs: [
        {
          date: "10-08-2024",
          version: "PS4 Patch v3.00",
          changes: [
            "Initial release added bypass for Minecraft version 1.21.41",
            "Added basic cross-platform functionality",
            "Improved connection stability",
            "Fixed minor bugs",
          ],
        },
        {
          date: "05-08-2024",
          version: "PS4 Patch v2.50",
          changes: [
            "Added new server types support",
            "Fixed authentication issues",
            "Improved loading times",
          ],
        },
      ],
    },
    {
      title: "Windows Tool",
      description: "Remote code execution for PS4 Minecraft Bedrock",
      imageUrl: "/windows-11.png",
      features: [
        "All Standard features",
        "Cheat management",
        "Advanced functionality",
        "Priority updates",
        "Dedicated support",
      ],
      buttonText: "Download",
      changelogs: [
        {
          date: "10-08-2024",
          version: "PS4 Patch v3.00",
          changes: [
            "Initial release of Premium Edition",
            "Added remote code execution",
            "Enhanced UI interface",
            "Improved connection reliability",
          ],
        },
        {
          date: "01-08-2024",
          version: "PS4 Patch v2.20",
          changes: [
            "Added new cheat codes",
            "Fixed memory leaks",
            "Improved performance",
          ],
        },
      ],
    },
  ],
  installation: {
    title: "Installation Guide",
    steps: [
      "Jailbreak your PS4 (firmware 11.00 or lower) using GoldHEN",
      "Inject PS4Debug payload",
      "Transfer GoldHEN patch via FTP to /data/GoldHEN/patches/xml",
      "Enable the patch in GoldHEN settings",
      "Ensure Minecraft version matches patch compatibility",
      "Download and install the patch",
      "Enjoy cross-platform play!",
    ],
    note: {
      title: "Important:",
      content: "Requires GoldHEN Cheat Manager. For MCHAX4U Tool, inject PS4Debug.bin first.",
    },
  },
};

export default function DownloadPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [expandedChangelogs, setExpandedChangelogs] = useState<Record<string, boolean>>({});

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    setIsClient(true);

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [session, loading, router]);

  const toggleChangelog = (editionTitle: string) => {
    setExpandedChangelogs(prev => ({
      ...prev,
      [editionTitle]: !prev[editionTitle]
    }));
  };

  if (loading || !session) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-120px)] p-4 flex items-center justify-center">
      {/* Main Container */}
      <div className="w-full max-w-6xl border-4 border-[#4a3b2a] bg-[#4a3b2a] rounded-lg overflow-hidden shadow-lg">
        
        {/* Header */}
        <div className="bg-[#8b6b4a] py-3 px-4 border-b-4 border-[#6d5a45] flex justify-between items-center">
          <h1 className="text-yellow-100 font-minecraft text-xl md:text-2xl tracking-wider">
            {downloadData.title}
          </h1>
          <div className="flex space-x-2">
            {['#ff5555', '#ffff55', '#55ff55'].map((color, i) => (
              <div 
                key={i}
                className="w-3 h-3 md:w-4 md:h-4 border-2"
                style={{
                  backgroundColor: color,
                  borderColor: color.replace('55', '00')
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#8b6b4a] p-4">
          {/* Editions Grid */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {downloadData.editions.map((edition) => (
              <div
                key={edition.title}
                className="bg-[#5e4b32] border-4 border-[#6d5a45] rounded-lg p-5"
              >
                {/* Edition Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="w-full max-w-[180px] md:max-w-[200px] rounded-lg overflow-hidden border-2 border-[#6d5a45]">
                      <Image
                        src={edition.imageUrl}
                        alt={`${edition.title} Image`}
                        width={200}
                        height={120}
                        className="w-full h-auto object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-yellow-100 font-minecraft text-xl md:text-2xl text-center md:text-left">
                      {edition.title}
                    </h2>
                    <p className="text-white font-minecraft text-sm mt-1">
                      {edition.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h3 className="text-yellow-100 font-minecraft text-lg mb-2">
                    Features:
                  </h3>
                  <ul className="text-white font-minecraft text-sm space-y-1 pl-5 list-disc">
                    {edition.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Download Button */}
                <button
                  className="w-full minecraft-download-btn py-2 px-4 flex items-center justify-center mb-4"
                  onClick={() => {
                    window.location.href = "https://github.com/NELUxP/ps4_mcbedrock_psn_bypass/releases/download/v1.0/CUSA00265.xml";
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {edition.buttonText} ({edition.title.split(' ')[0]})
                </button>

                {/* Improved Changelogs Section */}
                <div className="border-t border-[#6d5a45] pt-3">
                  <button
                    onClick={() => toggleChangelog(edition.title)}
                    className="flex items-center justify-between w-full text-yellow-100 font-minecraft hover:bg-[#6d5a45]/50 p-2 rounded transition-colors"
                  >
                    <div className="flex items-center">
                      <GitCommit className="h-4 w-4 mr-2" />
                      <span className="text-lg">Version History</span>
                    </div>
                    {expandedChangelogs[edition.title] ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedChangelogs[edition.title] ? 'max-h-[1000px]' : 'max-h-0'
                  }`}>
                    <div className="space-y-4 mt-3">
                      {edition.changelogs.map((log, i) => (
                        <div key={i} className="bg-[#4a3b2a]/70 p-4 rounded-lg border-l-4 border-yellow-500">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <span className="bg-yellow-500 text-[#4a3b2a] font-minecraft font-bold px-2 py-1 rounded mr-3">
                                {log.version}
                              </span>
                              <div className="flex items-center text-yellow-200 font-minecraft text-sm">
                                <Calendar className="h-3 w-3 mr-1" />
                                {log.date}
                              </div>
                            </div>
                            {i === 0 && (
                              <span className="bg-green-500/20 text-green-300 text-xs font-minecraft px-2 py-1 rounded">
                                LATEST
                              </span>
                            )}
                          </div>
                          <ul className="space-y-2">
                            {log.changes.map((change, j) => (
                              <li key={j} className="flex items-start">
                                <CheckCircle className="h-3 w-3 mt-1 mr-2 flex-shrink-0 text-yellow-300" />
                                <span className="text-yellow-100 font-minecraft text-sm">
                                  {change}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Installation Guide */}
          <div className="bg-[#5e4b32] border-4 border-[#6d5a45] rounded-lg p-5 mb-8">
            <h2 className="text-yellow-100 font-minecraft text-xl md:text-2xl mb-4">
              {downloadData.installation.title}
            </h2>
            <ol className="text-white font-minecraft text-sm space-y-2 pl-5 list-decimal">
              {downloadData.installation.steps.map((step, i) => (
                <li key={i} className="pl-2">{step}</li>
              ))}
            </ol>
            <div className="mt-4 p-3 bg-yellow-500/20 rounded border-2 border-yellow-500">
              <p className="text-yellow-100 font-minecraft font-semibold">
                {downloadData.installation.note.title}
              </p>
              <p className="text-white font-minecraft text-sm mt-1">
                {downloadData.installation.note.content}
              </p>
            </div>
          </div>

          {/* Donation Section */}
          {isClient && (
            <div className="bg-[#5e4b32] border-4 border-[#6d5a45] rounded-lg p-5 mb-8">
              <h2 className="text-yellow-100 font-minecraft text-xl md:text-2xl mb-4 text-center">
                ❤️ Support Our Work ❤️
              </h2>
              <Link
                href="https://www.donationalerts.com/r/neluxp_modz"
                target="_blank"
                rel="noopener noreferrer"
                className="minecraft-download-btn flex items-center justify-center py-3 px-6 text-center"
              >
                Buy Me A Coffee
              </Link>
            </div>
          )}

          {/* Discord Community */}
          {isClient && (
            <div className="bg-[#5e4b32] border-4 border-[#6d5a45] rounded-lg p-5">
              <h2 className="text-yellow-100 font-minecraft text-xl md:text-2xl mb-4 text-center">
                Join Our Community
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://discordapp.com/widget?id=436495506882166796&theme=dark"
                  width="100%"
                  height="350"
                  className="border-2 border-[#6d5a45] rounded-lg min-h-[300px]"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#8b6b4a] py-2 px-4 border-t-4 border-[#6d5a45] text-yellow-100 text-xs md:text-sm font-minecraft flex flex-col md:flex-row justify-between items-center">
          <span>MCHAX4U v2.1.0</span>
          <span>© 2025 Minecraft PS4 Edition</span>
        </div>
      </div>
    </div>
  );
}